-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 29, 2025 at 06:43 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `movie_app_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `actors`
--

CREATE TABLE `actors` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `birth_date` date NOT NULL,
  `country` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `actors`
--

INSERT INTO `actors` (`id`, `first_name`, `last_name`, `birth_date`, `country`, `created_at`, `updated_at`) VALUES
(1, 'Leonardo', 'DiCaprio', '1974-11-11', 'USA', '2025-05-29 14:07:26', '2025-05-29 14:07:26'),
(2, 'Joseph', 'Gordon-Levitt', '1981-02-17', 'USA', '2025-05-29 14:07:26', '2025-05-29 14:07:26'),
(3, 'Elliot', 'Page', '1987-02-21', 'Canada', '2025-05-29 14:07:26', '2025-05-29 14:07:26'),
(4, 'Samuel L.', 'Jackson', '1948-12-21', 'USA', '2025-05-29 14:07:26', '2025-05-29 14:07:26'),
(5, 'Uma', 'Thurman', '1970-04-29', 'USA', '2025-05-29 14:07:26', '2025-05-29 14:07:26'),
(6, 'Tom', 'Hanks', '1956-07-09', 'USA', '2025-05-29 14:07:26', '2025-05-29 14:07:26'),
(7, 'Kate', 'Winslet', '1975-10-05', 'UK', '2025-05-29 14:07:26', '2025-05-29 14:07:26'),
(8, 'Elijah', 'Wood', '1981-01-28', 'USA', '2025-05-29 14:07:26', '2025-05-29 14:07:26'),
(9, 'Ian', 'McKellen', '1939-05-25', 'UK', '2025-05-29 14:07:26', '2025-05-29 14:07:26'),
(10, 'John', 'Travolta', '1954-02-18', 'USA', '2025-05-29 14:07:26', '2025-05-29 14:07:26'),
(11, 'Morgan', 'Freeman', '1937-06-01', 'USA', '2025-05-29 14:07:26', '2025-05-29 14:07:26');

-- --------------------------------------------------------

--
-- Table structure for table `directors`
--

CREATE TABLE `directors` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `birth_date` date NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `directors`
--

INSERT INTO `directors` (`id`, `first_name`, `last_name`, `birth_date`, `created_at`, `updated_at`) VALUES
(1, 'Christopher', 'Nolan', '1970-07-30', '2025-05-29 14:07:26', '2025-05-29 14:07:26'),
(2, 'Quentin', 'Tarantino', '1963-03-27', '2025-05-29 14:07:26', '2025-05-29 14:07:26'),
(3, 'Steven', 'Spielberg', '1946-12-18', '2025-05-29 14:07:26', '2025-05-29 14:07:26'),
(4, 'James', 'Cameron', '1954-08-16', '2025-05-29 14:07:26', '2025-05-29 14:07:26'),
(5, 'Peter', 'Jackson', '1961-10-31', '2025-05-29 14:07:26', '2025-05-29 14:07:26');

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) NOT NULL,
  `connection` text NOT NULL,
  `queue` text NOT NULL,
  `payload` longtext NOT NULL,
  `exception` longtext NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '2014_10_12_000000_create_users_table', 1),
(2, '2014_10_12_100000_create_password_resets_table', 1),
(3, '2019_08_19_000000_create_failed_jobs_table', 1),
(4, '2019_12_14_000001_create_personal_access_tokens_table', 1),
(5, '2025_05_29_120327_create_directors_table', 1),
(6, '2025_05_29_120333_create_actors_table', 1),
(7, '2025_05_29_120340_create_movies_table', 1),
(8, '2025_05_29_120346_create_movie_actor_table', 1);

-- --------------------------------------------------------

--
-- Table structure for table `movies`
--

CREATE TABLE `movies` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `title` varchar(255) NOT NULL,
  `summary` text NOT NULL,
  `release_year` year(4) NOT NULL,
  `duration` int(11) NOT NULL,
  `genre` varchar(255) NOT NULL,
  `poster_url` varchar(255) DEFAULT NULL,
  `director_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `movies`
--

INSERT INTO `movies` (`id`, `title`, `summary`, `release_year`, `duration`, `genre`, `poster_url`, `director_id`, `created_at`, `updated_at`) VALUES
(1, 'Inception', 'A thief who steals corporate secrets through dream-sharing tech.', '2010', 148, 'Sci-Fi', 'https://m.media-amazon.com/images/I/81p+xe8cbnL._AC_SY679_.jpg', 1, '2025-05-29 14:07:26', '2025-05-29 14:07:26'),
(2, 'Pulp Fiction', 'Stories of crime and redemption collide in LA.', '1994', 154, 'Crime', 'https://m.media-amazon.com/images/I/71c05lTE03L._AC_SY679_.jpg', 2, '2025-05-29 14:07:26', '2025-05-29 14:07:26'),
(3, 'Titanic', 'An epic romance and disaster on the doomed ship.', '1997', 195, 'Romance', 'https://images.weserv.nl/?url=upload.wikimedia.org/wikipedia/en/2/22/Titanic_poster.jpg', 4, '2025-05-29 14:07:26', '2025-05-29 14:07:26'),
(4, 'The Lord of the Rings: The Fellowship of the Ring', 'A young hobbit sets out to destroy a powerful ring.', '2001', 178, 'Fantasy', 'https://image.tmdb.org/t/p/w500/6oom5QYQ2yQTMJIbnvbkBL9cHo6.jpg', 5, '2025-05-29 14:07:26', '2025-05-29 14:07:26'),
(5, 'Saving Private Ryan', 'A mission to rescue a paratrooper after D-Day.', '1998', 169, 'War', 'https://upload.wikimedia.org/wikipedia/en/a/ac/Saving_Private_Ryan_poster.jpg', 3, '2025-05-29 14:07:26', '2025-05-29 14:07:26'),
(6, 'The Dark Knight', 'Batman faces the Joker in a gritty crime saga.', '2008', 152, 'Action', 'https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg', 1, '2025-05-29 14:07:26', '2025-05-29 14:07:26'),
(7, 'Django Unchained', 'A freed slave sets out to rescue his wife.', '2012', 165, 'Western', 'https://image.tmdb.org/t/p/w500/7oWY8VDWW7thTzWh3OKYRkWUlD5.jpg', 2, '2025-05-29 14:07:26', '2025-05-29 14:07:26'),
(8, 'Forrest Gump', 'A man with a low IQ witnesses defining moments in US history.', '1994', 142, 'Drama', 'https://image.tmdb.org/t/p/w500/saHP97rTPS5eLmrLQEcANmKrsFl.jpg', 3, '2025-05-29 14:07:26', '2025-05-29 14:07:26'),
(9, 'Avatar', 'A Marine on an alien planet gets caught between two worlds.', '2009', 162, 'Sci-Fi', 'https://images.weserv.nl/?url=upload.wikimedia.org/wikipedia/en/b/b0/Avatar-Teaser-Poster.jpg', 4, '2025-05-29 14:07:26', '2025-05-29 14:07:26'),
(10, 'The Shawshank Redemption', 'Two imprisoned men bond over decades.', '1994', 142, 'Drama', 'https://image.tmdb.org/t/p/w500/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg', 3, '2025-05-29 14:07:26', '2025-05-29 14:07:26');

-- --------------------------------------------------------

--
-- Table structure for table `movie_actor`
--

CREATE TABLE `movie_actor` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `movie_id` bigint(20) UNSIGNED NOT NULL,
  `actor_id` bigint(20) UNSIGNED NOT NULL,
  `role` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `movie_actor`
--

INSERT INTO `movie_actor` (`id`, `movie_id`, `actor_id`, `role`, `created_at`, `updated_at`) VALUES
(1, 1, 1, 'Dom Cobb', '2025-05-29 14:07:26', '2025-05-29 14:07:26'),
(2, 1, 2, 'Arthur', '2025-05-29 14:07:26', '2025-05-29 14:07:26'),
(3, 1, 3, 'Ariadne', '2025-05-29 14:07:26', '2025-05-29 14:07:26'),
(4, 2, 4, 'Jules Winnfield', '2025-05-29 14:07:26', '2025-05-29 14:07:26'),
(5, 2, 5, 'Mia Wallace', '2025-05-29 14:07:26', '2025-05-29 14:07:26'),
(6, 2, 10, 'Vincent Vega', '2025-05-29 14:07:26', '2025-05-29 14:07:26'),
(7, 3, 1, 'Jack Dawson', '2025-05-29 14:07:26', '2025-05-29 14:07:26'),
(8, 3, 7, 'Rose DeWitt Bukater', '2025-05-29 14:07:26', '2025-05-29 14:07:26'),
(9, 4, 8, 'Frodo Baggins', '2025-05-29 14:07:26', '2025-05-29 14:07:26'),
(10, 4, 9, 'Gandalf', '2025-05-29 14:07:26', '2025-05-29 14:07:26'),
(11, 5, 6, 'Captain John Miller', '2025-05-29 14:07:26', '2025-05-29 14:07:26'),
(12, 6, 1, 'Bruce Wayne / Batman', '2025-05-29 14:07:26', '2025-05-29 14:07:26'),
(13, 7, 4, 'Stephen', '2025-05-29 14:07:26', '2025-05-29 14:07:26'),
(14, 8, 6, 'Forrest Gump', '2025-05-29 14:07:26', '2025-05-29 14:07:26'),
(15, 9, 1, 'Jake Sully', '2025-05-29 14:07:26', '2025-05-29 14:07:26'),
(16, 10, 11, 'Ellis Boyd \"Red\" Redding', '2025-05-29 14:07:26', '2025-05-29 14:07:26');

-- --------------------------------------------------------

--
-- Table structure for table `password_resets`
--

CREATE TABLE `password_resets` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) NOT NULL,
  `tokenable_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `token` varchar(64) NOT NULL,
  `abilities` text DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `actors`
--
ALTER TABLE `actors`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `directors`
--
ALTER TABLE `directors`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `movies`
--
ALTER TABLE `movies`
  ADD PRIMARY KEY (`id`),
  ADD KEY `movies_director_id_foreign` (`director_id`);

--
-- Indexes for table `movie_actor`
--
ALTER TABLE `movie_actor`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `movie_actor_movie_id_actor_id_unique` (`movie_id`,`actor_id`),
  ADD KEY `movie_actor_actor_id_foreign` (`actor_id`);

--
-- Indexes for table `password_resets`
--
ALTER TABLE `password_resets`
  ADD PRIMARY KEY (`email`);

--
-- Indexes for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `actors`
--
ALTER TABLE `actors`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `directors`
--
ALTER TABLE `directors`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `movies`
--
ALTER TABLE `movies`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `movie_actor`
--
ALTER TABLE `movie_actor`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `movies`
--
ALTER TABLE `movies`
  ADD CONSTRAINT `movies_director_id_foreign` FOREIGN KEY (`director_id`) REFERENCES `directors` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `movie_actor`
--
ALTER TABLE `movie_actor`
  ADD CONSTRAINT `movie_actor_actor_id_foreign` FOREIGN KEY (`actor_id`) REFERENCES `actors` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `movie_actor_movie_id_foreign` FOREIGN KEY (`movie_id`) REFERENCES `movies` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
