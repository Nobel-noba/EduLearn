<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Throwable;

class EnsureDatabaseSeeded extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'db:ensure-seeded {--force : Force running migrations and seeders without confirmation}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Ensure database schema is migrated and seeded if empty';

    /**
     * Execute the console command.
     */
    public function handle(): int
    {
        $this->components->info('Checking database migration and seed status...');

        try {
            // 1. Run migrations first
            $this->components->info('Running database migrations (if pending)...');
            $migrationExit = $this->call('migrate', ['--force' => true]);

            if ($migrationExit !== 0) {
                $this->components->error('Database migrations failed with exit code ' . $migrationExit);
                return $migrationExit;
            }

            // 2. Check if the database has records
            // We inspect the primary 'user' table
            $needsSeeding = false;

            if (!Schema::hasTable('user')) {
                $needsSeeding = true;
            } else {
                $userCount = DB::table('user')->count();
                if ($userCount === 0) {
                    $needsSeeding = true;
                }
            }

            if ($needsSeeding) {
                $this->components->warn('Database is empty. Initializing initial database seed...');
                $seedExit = $this->call('db:seed', ['--force' => true]);

                if ($seedExit === 0) {
                    $this->components->info('Database successfully seeded with initial platform data.');
                } else {
                    $this->components->error('Database seeding encountered an issue (exit code: ' . $seedExit . ').');
                    return $seedExit;
                }
            } else {
                $userCount = DB::table('user')->count();
                $this->components->info("Database already contains data ({$userCount} users found). Skipping initial seeding.");
            }

            return Command::SUCCESS;
        } catch (Throwable $e) {
            $this->components->error('Failed to ensure database state: ' . $e->getMessage());
            return Command::FAILURE;
        }
    }
}
