-- Run this once as a MySQL administrator. Choose a strong password in place of
-- CHANGE_THIS_PASSWORD; do not commit the real password to source control.

CREATE DATABASE IF NOT EXISTS swarnabhoomi
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

CREATE USER IF NOT EXISTS 'swarnabhoomi_app'@'localhost'
  IDENTIFIED BY 'CHANGE_THIS_PASSWORD';

GRANT ALL PRIVILEGES ON swarnabhoomi.* TO 'swarnabhoomi_app'@'localhost';
FLUSH PRIVILEGES;
