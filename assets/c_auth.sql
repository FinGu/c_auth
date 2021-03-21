-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Dec 28, 2020 at 02:30 AM
-- Server version: 10.4.17-MariaDB
-- PHP Version: 8.0.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `c_auth`
--

-- --------------------------------------------------------

--
-- Table structure for table `c_password_resets`
--

CREATE TABLE `c_password_resets` (
  `c_id` int(11) NOT NULL,
  `c_email` varchar(255) NOT NULL,
  `c_code` varchar(255) NOT NULL,
  `c_expiry` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `c_programs`
--

CREATE TABLE `c_programs` (
  `c_id` int(11) NOT NULL,
  `c_owner` varchar(255) NOT NULL,
  `c_program_name` varchar(255) NOT NULL,
  `c_program_key` varchar(255) NOT NULL DEFAULT '0',
  `c_encryption_key` varchar(255) NOT NULL DEFAULT '0',
  `c_dl` varchar(255) NOT NULL DEFAULT '0',
  `c_version` double(10,1) NOT NULL DEFAULT 1.0,
  `c_sem` int(11) NOT NULL DEFAULT 15,
  `c_killswitch` int(11) NOT NULL DEFAULT 0,
  `c_hwide` int(11) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `c_program_files`
--

CREATE TABLE `c_program_files` (
  `c_id` int(11) NOT NULL,
  `c_program` varchar(255) NOT NULL,
  `c_file_id` varchar(255) NOT NULL,
  `c_file_name` varchar(255) NOT NULL,
  `c_file_location` varchar(255) NOT NULL,
  `c_enc_key` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `c_program_logs`
--

CREATE TABLE `c_program_logs` (
  `c_id` int(11) NOT NULL,
  `c_program` varchar(255) NOT NULL DEFAULT '0',
  `c_username` varchar(255) NOT NULL DEFAULT 'none',
  `c_message` varchar(255) NOT NULL DEFAULT 'none',
  `c_time` varchar(255) NOT NULL DEFAULT '0',
  `c_ip` varchar(255) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `c_program_sessions`
--

CREATE TABLE `c_program_sessions` (
  `c_id` int(11) NOT NULL,
  `c_program` varchar(255) NOT NULL,
  `c_session` varchar(255) NOT NULL,
  `c_expires` varchar(255) NOT NULL,
  `c_iv` varchar(255) NOT NULL,
  `c_logged_in` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `c_program_tokens`
--

CREATE TABLE `c_program_tokens` (
  `c_id` int(11) NOT NULL,
  `c_program` varchar(255) NOT NULL,
  `c_token` varchar(255) NOT NULL,
  `c_days` varchar(255) NOT NULL,
  `c_rank` int(11) NOT NULL DEFAULT 0,
  `c_used` int(11) NOT NULL DEFAULT 0,
  `c_used_by` varchar(255) NOT NULL DEFAULT 'none'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `c_program_users`
--

CREATE TABLE `c_program_users` (
  `c_id` int(11) NOT NULL,
  `c_program` varchar(255) NOT NULL,
  `c_username` varchar(255) NOT NULL DEFAULT '0',
  `c_email` varchar(255) NOT NULL DEFAULT '0',
  `c_password` varchar(255) NOT NULL DEFAULT '0',
  `c_expires` varchar(255) NOT NULL DEFAULT '0',
  `c_paused` varchar(255) NOT NULL DEFAULT '0',
  `c_hwid` varchar(255) NOT NULL DEFAULT '0',
  `c_rank` int(11) NOT NULL DEFAULT 0,
  `c_var` varchar(255) NOT NULL DEFAULT 'none',
  `c_banned` int(11) NOT NULL DEFAULT 0,
  `c_ip` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `c_program_vars`
--

CREATE TABLE `c_program_vars` (
  `c_id` int(11) NOT NULL,
  `c_program` varchar(255) NOT NULL DEFAULT '0',
  `c_name` varchar(255) NOT NULL DEFAULT '0',
  `c_value` varchar(255) NOT NULL DEFAULT '0',
  `c_enc_key` varchar(255) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `c_tokens`
--

CREATE TABLE `c_tokens` (
  `c_id` int(11) NOT NULL,
  `c_token` varchar(255) NOT NULL,
  `c_used` int(11) NOT NULL DEFAULT 0,
  `c_used_by` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `c_users`
--

CREATE TABLE `c_users` (
  `c_id` int(11) NOT NULL,
  `c_username` varchar(255) NOT NULL DEFAULT '0',
  `c_email` varchar(255) NOT NULL DEFAULT '0',
  `c_password` varchar(255) NOT NULL DEFAULT '0',
  `c_admin_token` varchar(255) NOT NULL DEFAULT '0',
  `c_premium` int(11) NOT NULL DEFAULT 0,
  `c_admin` int(11) NOT NULL DEFAULT 0,
  `c_ip` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `c_password_resets`
--
ALTER TABLE `c_password_resets`
  ADD PRIMARY KEY (`c_id`);

--
-- Indexes for table `c_programs`
--
ALTER TABLE `c_programs`
  ADD PRIMARY KEY (`c_id`);

--
-- Indexes for table `c_program_files`
--
ALTER TABLE `c_program_files`
  ADD PRIMARY KEY (`c_id`);

--
-- Indexes for table `c_program_logs`
--
ALTER TABLE `c_program_logs`
  ADD PRIMARY KEY (`c_id`);

--
-- Indexes for table `c_program_sessions`
--
ALTER TABLE `c_program_sessions`
  ADD PRIMARY KEY (`c_id`);

--
-- Indexes for table `c_program_tokens`
--
ALTER TABLE `c_program_tokens`
  ADD PRIMARY KEY (`c_id`);

--
-- Indexes for table `c_program_users`
--
ALTER TABLE `c_program_users`
  ADD PRIMARY KEY (`c_id`);

--
-- Indexes for table `c_program_vars`
--
ALTER TABLE `c_program_vars`
  ADD PRIMARY KEY (`c_id`);

--
-- Indexes for table `c_tokens`
--
ALTER TABLE `c_tokens`
  ADD PRIMARY KEY (`c_id`);

--
-- Indexes for table `c_users`
--
ALTER TABLE `c_users`
  ADD PRIMARY KEY (`c_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `c_password_resets`
--
ALTER TABLE `c_password_resets`
  MODIFY `c_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `c_programs`
--
ALTER TABLE `c_programs`
  MODIFY `c_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `c_program_files`
--
ALTER TABLE `c_program_files`
  MODIFY `c_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `c_program_logs`
--
ALTER TABLE `c_program_logs`
  MODIFY `c_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `c_program_sessions`
--
ALTER TABLE `c_program_sessions`
  MODIFY `c_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `c_program_tokens`
--
ALTER TABLE `c_program_tokens`
  MODIFY `c_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `c_program_users`
--
ALTER TABLE `c_program_users`
  MODIFY `c_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `c_program_vars`
--
ALTER TABLE `c_program_vars`
  MODIFY `c_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `c_tokens`
--
ALTER TABLE `c_tokens`
  MODIFY `c_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `c_users`
--
ALTER TABLE `c_users`
  MODIFY `c_id` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
