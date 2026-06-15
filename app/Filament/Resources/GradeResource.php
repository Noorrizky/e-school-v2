<?php

namespace App\Filament\Resources;

use App\Filament\Resources\GradeResource\Pages;
use App\Models\Grade;
use Filament\Forms;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\Auth;

class GradeResource extends Resource
{
    protected static ?string $model = Grade::class;

    protected static ?string $navigationIcon = 'heroicon-o-rectangle-stack';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Select::make('student_id')
                    ->label('Nama Siswa')
                    ->relationship('student', 'name', fn($query) => $query->whereHas('roles', fn($q) => $q->where('name', 'student')))
                    ->preload()
                    ->searchable()
                    ->required(),
                Select::make('subject_id')
                    ->label('Mata Pelajaran')
                    ->relationship('subject', 'name', function (Builder $query) {
                        // 1. TYPE HINT & FACADE: Gunakan Facade Auth langsung agar Intelephense tenang
                        /** @var \App\Models\User|null $user */
                        $user = \Illuminate\Support\Facades\Auth::user();

                        // 2. SAFETY CHECK: Filter jika user adalah Teacher
                        if ($user && method_exists($user, 'hasAnyRole') && $user->hasAnyRole(['teacher', 'Teacher'])) {
                            return $query->whereHas('schedules', function (Builder $q) use ($user) {
                                $q->where('teacher_id', $user->id);
                            });
                        }

                        // Jika Super Admin, tampilkan semua mapel
                        return $query;
                    })
                    ->preload()
                    ->searchable()
                    ->required(),
                Select::make('semester_id')
                    ->label('Semester')
                    ->relationship('semester', 'name')
                    ->preload()
                    ->searchable()
                    ->required(),
                TextInput::make('score')
                    ->label('Nilai Angka')
                    ->numeric()
                    ->minValue(0)
                    ->maxValue(100)
                    ->required(),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('student.name')->label('Siswa')->searchable()->sortable(),
                TextColumn::make('subject.name')->label('Mata Pelajaran')->searchable(),
                TextColumn::make('semester.name')->label('Semester')->sortable(),
                TextColumn::make('score')
                    ->label('Nilai')
                    ->badge()
                    // FIX: Removed strict 'string' type hint to prevent TypeErrors on ints/nulls
                    ->color(fn($state): string => match (true) {
                        $state >= 80 => 'success',
                        $state >= 60 => 'warning',
                        default => 'danger',
                    })
                    ->sortable(),
            ])
            ->filters([
                Tables\Filters\SelectFilter::make('semester_id')
                    ->label('Semester')
                    ->relationship('semester', 'name'),
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ]);
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListGrades::route('/'),
            'create' => Pages\CreateGrade::route('/create'),
            'edit' => Pages\EditGrade::route('/{record}/edit'),
        ];
    }

    public static function getEloquentQuery(): Builder
    {
        $query = parent::getEloquentQuery();

        /** @var \App\Models\User|null $user */
        $user = \Illuminate\Support\Facades\Auth::user();

        // Menyaring data di halaman LIST GRADES
        if ($user && method_exists($user, 'hasAnyRole') && $user->hasAnyRole(['teacher', 'Teacher'])) {
            return $query->whereHas('subject.schedules', function (Builder $q) use ($user) {
                $q->where('teacher_id', $user->id);
            });
        }

        return $query;
    }
}
