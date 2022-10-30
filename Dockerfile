FROM php:7.4-apache-bullseye

RUN apt-get update && apt-get install -y libzip-dev zip libpng-dev
RUN pecl install xdebug-2.8.1

RUN docker-php-ext-install zip gd
RUN docker-php-ext-enable xdebug