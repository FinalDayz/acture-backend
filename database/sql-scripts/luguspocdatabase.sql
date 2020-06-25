-- phpMyAdmin SQL Dump
-- version 4.6.6deb5
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Gegenereerd op: 24 jun 2020 om 09:01
-- Serverversie: 5.7.30-0ubuntu0.18.04.1
-- PHP-versie: 7.2.24-0ubuntu0.18.04.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `luguspocdatabase`
--

DELIMITER $$
--
-- Procedures
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `add_new_event` (IN `eventText` TEXT, IN `eventImage` TEXT, IN `eventUserId` INT(11), IN `eventTitle` VARCHAR(45), IN `eventName` VARCHAR(45), IN `eventDate` DATETIME, IN `eventAddress` VARCHAR(50), IN `eventCity` VARCHAR(30), IN `eventPrice` VARCHAR(10))  NO SQL
    DETERMINISTIC
BEGIN
	insert into Post(text, image, userId, categoryId, title, postDate)
	values(eventText, FROM_BASE64(eventImage), eventUserId, '4', eventTitle,     now());

	insert into Event(name, postId, date, adress, city, price)
	values(eventName, last_insert_id(), eventDate, eventAddress, eventCity, 	eventPrice);
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `add_new_startup` (IN `startupName` VARCHAR(45), IN `startupDescription` TEXT, IN `startupPhone` VARCHAR(15), IN `startupMail` VARCHAR(45), IN `startupSite` VARCHAR(45), IN `startupImage` BLOB, IN `startupUserId` INT(11))  NO SQL
BEGIN
	INSERT INTO Startup(name, description, telephone, email, website, image, ownerId) 
    VALUES ( startupName, startupDescription, startupPhone, startupMail, startupSite, startupImage, StartupUserId);
    
    INSERT INTO Startup_user(startupId, userId)
    VALUES ( last_insert_id(), startupUserId);
    
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `edit_event` (IN `eventText` TEXT, IN `eventImage` TEXT, IN `eventTitle` VARCHAR(45), IN `eventPostId` INT(11), IN `eventName` VARCHAR(45), IN `eventDate` DATETIME, IN `eventAddress` VARCHAR(50), IN `eventCity` VARCHAR(30), IN `eventPrice` VARCHAR(10))  NO SQL
    DETERMINISTIC
BEGIN
	UPDATE Post
    SET text = eventText, image = FROM_BASE64(eventImage), 
    title = eventTitle
    WHERE postId = eventPostId;
    
    UPDATE Event
    SET name = eventName, date = eventDate, adress = eventAddress, 
    city = eventCity, price = eventPrice
    WHERE postId = eventPostId;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `get_blogs` (IN `given` INT)  SELECT DISTINCT p.postId, p.text, p.title, p.categoryId, p.postDate, TO_BASE64(p.image), p.userId, a.firstname, a.lastname, a.tussenvoegsel, TO_BASE64(a.image) AS profileImage, c.name AS categoryname
FROM Post p 
LEFT JOIN Account a
ON p.userId = a.userId
LEFT JOIN Category c
ON p.categoryId = c.categoryId
WHERE p.categoryId = 7
ORDER BY p.postDate DESC
LIMIT 10 OFFSET given$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `get_events` (IN `uId` INT, IN `given` INT)  SELECT DISTINCT p.*, e.*, a.firstname, a.lastname, a.tussenvoegsel, TO_BASE64(a.image) AS profileImage, c.name AS categoryname, IF(e.evenementId IN (SELECT eventId FROM Attendants WHERE userId = uId), true, false) AS doesAttend 
FROM Post p
LEFT JOIN Event e
ON p.postId = e.postId
LEFT JOIN Account a
ON p.userId = a.userId
LEFT JOIN Category c
ON p.categoryId = c.categoryId
LEFT JOIN Attendants att
ON e.evenementId = att.eventId
WHERE p.categoryId = 4
ORDER BY e.date
Limit 10 OFFSET given$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `get_feed` (IN `uId` INT, IN `given` INT)  NO SQL
    COMMENT 'categoryId 2 is Lugus News'
SELECT DISTINCT p.postId, p.text, p.title, p.categoryId, p.postDate, TO_BASE64(p.image) AS image, p.userId, p.startup AS startupId, a.firstname, a.lastname, a.tussenvoegsel, TO_BASE64(a.image) AS profileImage, c.name AS categoryname, e.adress, e.city, e.date, e.evenementId, e.name, e.price, e.registration_deadline, e.total_people
FROM Post p 
LEFT JOIN Account a
ON p.userId = a.userId
LEFT JOIN Category c
ON p.categoryId = c.categoryId
LEFT JOIN Event e 
ON p.postId = e.postId
WHERE p.userId=uId
OR p.categoryId = 2
OR p.categoryId = 4
OR p.userId IN (
	SELECT followedUser
	FROM Followed_people
	WHERE userId = uId)
OR p.startup IN (
	SELECT startupId
	FROM Followed_startups
	WHERE userId = uId)
OR p.userId IN (
	SELECT categoryId
	FROM Followed_disciplines
	WHERE userId = uId)
ORDER BY p.postDate DESC
LIMIT 10 OFFSET given$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `get_global_feed` (IN `given` INT)  SELECT DISTINCT p.postId, p.text, p.title, p.categoryId, p.postDate, TO_BASE64(p.image), p.userId, p.startup AS startupId, a.firstname, a.lastname, a.tussenvoegsel, TO_BASE64(a.image) AS profileImage, c.name AS categoryname, e.adress, e.city, e.date, e.evenementId, e.name, e.price, e.registration_deadline, e.total_people 
FROM Post p 
LEFT JOIN Account a
ON p.userId = a.userId
LEFT JOIN Category c
ON p.categoryId = c.categoryId
LEFT JOIN Event e 
ON p.postId = e.postId
ORDER BY p.postDate DESC
LIMIT 10 OFFSET given$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `get_guides` (IN `given` INT)  SELECT DISTINCT p.postId, p.text, p.title, p.categoryId, p.postDate, TO_BASE64(p.image), p.userId, a.firstname, a.lastname, a.tussenvoegsel, TO_BASE64(a.image) AS profileImage, c.name AS categoryname
FROM Post p 
LEFT JOIN Account a
ON p.userId = a.userId
LEFT JOIN Category c
ON p.categoryId = c.categoryId
WHERE p.categoryId = 6
ORDER BY p.postDate DESC
LIMIT 10 OFFSET given$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `get_my_events` (IN `uId` INT)  READS SQL DATA
SELECT p.*, e.*, a.firstname, a.lastname, a.tussenvoegsel, a.image, c.name AS categoryname
FROM Post p 
LEFT JOIN Event e
ON p.postId = e.postId
LEFT JOIN Account a
ON p.userId = a.userId
LEFT JOIN Category c
ON p.categoryId = c.categoryId
WHERE p.categoryId = 4
AND e.evenementId IN (
    SELECT * 
    FROM Attendants aa
    WHERE aa.userId = uId
    )
ORDER BY e.date
Limit 10 OFFSET 0$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `get_only_lugus` (IN `given` INT)  READS SQL DATA
    COMMENT ' category 2 is lugus news'
SELECT DISTINCT p.*, a.firstname, a.lastname, a.tussenvoegsel, a.image, f.name AS categoryname
FROM Post p 
LEFT JOIN Account a
ON p.userId = a.userId
LEFT JOIN Category f
ON p.categoryId = f.categoryId

WHERE p.categoryId = 2

ORDER BY p.postDate DESC
LIMIT 15 OFFSET given$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `get_user_feed` (IN `userId` INT, IN `given` INT)  NO SQL
SELECT DISTINCT p.postId, p.text, p.title, p.categoryId, p.postDate, TO_BASE64(p.image), p.userId, p.startup AS startupId, a.firstname, a.lastname, a.tussenvoegsel, TO_BASE64(a.image) AS profileImage, c.name AS categoryname, e.adress, e.city, e.date, e.evenementId, e.name, e.price, e.registration_deadline, e.total_people 
FROM Post p 
LEFT JOIN Account a
ON p.userId = a.userId
LEFT JOIN Category c
ON p.categoryId = c.categoryId
LEFT JOIN Event e 
ON p.postId = e.postId
WHERE a.userId = userId
ORDER BY p.postDate DESC
LIMIT 10 OFFSET given$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `update_attendance` (IN `evId` INT, IN `uId` INT)  NO SQL
INSERT INTO Attendants 
VALUE (evId , uId)$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `Account`
--

CREATE TABLE `Account` (
  `firstname` varchar(45) NOT NULL,
  `lastname` varchar(45) NOT NULL,
  `userId` int(11) NOT NULL,
  `address` varchar(45) DEFAULT NULL,
  `tussenvoegsel` varchar(45) DEFAULT NULL,
  `register_date` date DEFAULT NULL,
  `unregister_date` date DEFAULT NULL,
  `password` varchar(61) DEFAULT NULL,
  `role` enum('user','member','admin') NOT NULL DEFAULT 'user',
  `email` varchar(45) NOT NULL,
  `image` blob,
  `telephone` int(11) DEFAULT NULL,
  `description` varchar(300) DEFAULT NULL,
  `activated` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `Answer`
--

CREATE TABLE `Answer` (
  `postId` int(11) NOT NULL,
  `questionId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `Attendants`
--

CREATE TABLE `Attendants` (
  `eventId` int(11) NOT NULL,
  `userId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `Category`
--

CREATE TABLE `Category` (
  `categoryId` int(11) NOT NULL,
  `name` varchar(45) DEFAULT NULL,
  `type` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `Event`
--

CREATE TABLE `Event` (
  `evenementId` int(11) NOT NULL,
  `name` varchar(45) DEFAULT NULL,
  `registration_deadline` datetime DEFAULT NULL,
  `postId` int(11) NOT NULL,
  `date` datetime DEFAULT NULL,
  `total_people` int(11) DEFAULT '0',
  `adress` varchar(50) DEFAULT NULL,
  `city` varchar(30) DEFAULT NULL,
  `price` varchar(10) DEFAULT 'Gratis'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `Followed_disciplines`
--

CREATE TABLE `Followed_disciplines` (
  `userId` int(11) NOT NULL,
  `categoryId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `Followed_people`
--

CREATE TABLE `Followed_people` (
  `userId` int(11) NOT NULL,
  `followedUser` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `Followed_startups`
--

CREATE TABLE `Followed_startups` (
  `userId` int(11) NOT NULL,
  `startupId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `Message`
--

CREATE TABLE `Message` (
  `messageId` int(11) NOT NULL,
  `text` varchar(45) DEFAULT NULL,
  `read` tinyint(1) DEFAULT NULL,
  `date` datetime DEFAULT NULL,
  `senderId` int(11) NOT NULL,
  `receiverId` int(11) NOT NULL,
  `title` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `Partners`
--

CREATE TABLE `Partners` (
  `partnerId` int(11) NOT NULL,
  `name` varchar(45) DEFAULT NULL,
  `image` blob
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `Post`
--

CREATE TABLE `Post` (
  `postId` int(11) NOT NULL,
  `text` text,
  `image` blob,
  `userId` int(11) NOT NULL,
  `postDate` datetime DEFAULT NULL,
  `categoryId` int(11) NOT NULL,
  `title` varchar(45) DEFAULT NULL,
  `startup` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `Privacy`
--

CREATE TABLE `Privacy` (
  `firstname` tinyint(1) NOT NULL,
  `lastname` tinyint(1) NOT NULL,
  `address` tinyint(1) DEFAULT NULL,
  `tussenvoegsel` tinyint(1) DEFAULT NULL,
  `email` tinyint(1) DEFAULT NULL,
  `userId` int(11) NOT NULL,
  `telephone` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `Question`
--

CREATE TABLE `Question` (
  `postId` int(11) NOT NULL,
  `bestReaction` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `Startup`
--

CREATE TABLE `Startup` (
  `startupId` int(11) NOT NULL,
  `name` varchar(45) DEFAULT NULL,
  `telephone` varchar(15) DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL,
  `image` blob,
  `description` text,
  `website` varchar(45) DEFAULT NULL,
  `ownerId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `Startup_user`
--

CREATE TABLE `Startup_user` (
  `startupId` int(11) NOT NULL,
  `userId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Indexen voor geëxporteerde tabellen
--

--
-- Indexen voor tabel `Account`
--
ALTER TABLE `Account`
  ADD PRIMARY KEY (`userId`);

--
-- Indexen voor tabel `Answer`
--
ALTER TABLE `Answer`
  ADD PRIMARY KEY (`postId`),
  ADD KEY `fk_Answer_Post1_idx` (`postId`),
  ADD KEY `questionId_idx` (`questionId`);

--
-- Indexen voor tabel `Attendants`
--
ALTER TABLE `Attendants`
  ADD KEY `fk_Attendants_Event1_idx` (`eventId`),
  ADD KEY `fk_Attendants_Account1_idx` (`userId`);

--
-- Indexen voor tabel `Category`
--
ALTER TABLE `Category`
  ADD PRIMARY KEY (`categoryId`);

--
-- Indexen voor tabel `Event`
--
ALTER TABLE `Event`
  ADD PRIMARY KEY (`evenementId`),
  ADD KEY `fk_Evenementen_Posts1_idx` (`postId`);

--
-- Indexen voor tabel `Followed_disciplines`
--
ALTER TABLE `Followed_disciplines`
  ADD PRIMARY KEY (`userId`,`categoryId`),
  ADD KEY `fk_Disciplines_has_Account_Account1_idx` (`userId`),
  ADD KEY `fk_Discipline followers_Category1_idx` (`categoryId`);

--
-- Indexen voor tabel `Followed_people`
--
ALTER TABLE `Followed_people`
  ADD PRIMARY KEY (`userId`,`followedUser`),
  ADD KEY `fk_Followed people_Account1_idx` (`userId`);

--
-- Indexen voor tabel `Followed_startups`
--
ALTER TABLE `Followed_startups`
  ADD PRIMARY KEY (`userId`,`startupId`),
  ADD KEY `fk_Account_has_Startups_Startups1_idx` (`startupId`),
  ADD KEY `fk_Account_has_Startups_Account1_idx` (`userId`);

--
-- Indexen voor tabel `Message`
--
ALTER TABLE `Message`
  ADD PRIMARY KEY (`messageId`),
  ADD KEY `senderId_idx` (`senderId`),
  ADD KEY `fk_Message_Account1_idx` (`receiverId`);

--
-- Indexen voor tabel `Partners`
--
ALTER TABLE `Partners`
  ADD PRIMARY KEY (`partnerId`);

--
-- Indexen voor tabel `Post`
--
ALTER TABLE `Post`
  ADD PRIMARY KEY (`postId`),
  ADD KEY `fk_Posts_Account1_idx` (`userId`),
  ADD KEY `fk_Post_Category1_idx` (`categoryId`),
  ADD KEY `startup` (`startup`);

--
-- Indexen voor tabel `Privacy`
--
ALTER TABLE `Privacy`
  ADD PRIMARY KEY (`userId`),
  ADD KEY `fk_Privacy_Account1_idx` (`userId`);

--
-- Indexen voor tabel `Question`
--
ALTER TABLE `Question`
  ADD PRIMARY KEY (`postId`),
  ADD KEY `answerId_idx` (`bestReaction`);

--
-- Indexen voor tabel `Startup`
--
ALTER TABLE `Startup`
  ADD PRIMARY KEY (`startupId`),
  ADD KEY `fk_Startups_Account1_idx` (`ownerId`);

--
-- Indexen voor tabel `Startup_user`
--
ALTER TABLE `Startup_user`
  ADD PRIMARY KEY (`startupId`,`userId`),
  ADD KEY `fk_Startup_has_Account_Account1_idx` (`userId`),
  ADD KEY `fk_Startup_has_Account_Startup1_idx` (`startupId`);

--
-- AUTO_INCREMENT voor geëxporteerde tabellen
--

--
-- AUTO_INCREMENT voor een tabel `Account`
--
ALTER TABLE `Account`
  MODIFY `userId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;
--
-- AUTO_INCREMENT voor een tabel `Category`
--
ALTER TABLE `Category`
  MODIFY `categoryId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
--
-- AUTO_INCREMENT voor een tabel `Event`
--
ALTER TABLE `Event`
  MODIFY `evenementId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
--
-- AUTO_INCREMENT voor een tabel `Message`
--
ALTER TABLE `Message`
  MODIFY `messageId` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT voor een tabel `Partners`
--
ALTER TABLE `Partners`
  MODIFY `partnerId` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT voor een tabel `Post`
--
ALTER TABLE `Post`
  MODIFY `postId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1234589;
--
-- AUTO_INCREMENT voor een tabel `Startup`
--
ALTER TABLE `Startup`
  MODIFY `startupId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- Beperkingen voor geëxporteerde tabellen
--

--
-- Beperkingen voor tabel `Answer`
--
ALTER TABLE `Answer`
  ADD CONSTRAINT `answerId` FOREIGN KEY (`postId`) REFERENCES `Post` (`postId`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `questionId` FOREIGN KEY (`questionId`) REFERENCES `Post` (`postId`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Beperkingen voor tabel `Attendants`
--
ALTER TABLE `Attendants`
  ADD CONSTRAINT `fk_Attendants_Account1` FOREIGN KEY (`userId`) REFERENCES `Account` (`userId`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_Attendants_Event1` FOREIGN KEY (`eventId`) REFERENCES `Event` (`evenementId`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Beperkingen voor tabel `Event`
--
ALTER TABLE `Event`
  ADD CONSTRAINT `fk_Evenementen_Posts1` FOREIGN KEY (`postId`) REFERENCES `Post` (`postId`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Beperkingen voor tabel `Followed_disciplines`
--
ALTER TABLE `Followed_disciplines`
  ADD CONSTRAINT `fk_Discipline followers_Category1` FOREIGN KEY (`categoryId`) REFERENCES `Category` (`categoryId`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_Disciplines_has_Account_Account1` FOREIGN KEY (`userId`) REFERENCES `Account` (`userId`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Beperkingen voor tabel `Followed_people`
--
ALTER TABLE `Followed_people`
  ADD CONSTRAINT `fk_Followed people_Account1` FOREIGN KEY (`userId`) REFERENCES `Account` (`userId`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Beperkingen voor tabel `Followed_startups`
--
ALTER TABLE `Followed_startups`
  ADD CONSTRAINT `fk_Account_has_Startups_Account1` FOREIGN KEY (`userId`) REFERENCES `Account` (`userId`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_Account_has_Startups_Startups1` FOREIGN KEY (`startupId`) REFERENCES `Startup` (`startupId`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Beperkingen voor tabel `Message`
--
ALTER TABLE `Message`
  ADD CONSTRAINT `receiverId` FOREIGN KEY (`receiverId`) REFERENCES `Account` (`userId`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `senderId` FOREIGN KEY (`senderId`) REFERENCES `Account` (`userId`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Beperkingen voor tabel `Post`
--
ALTER TABLE `Post`
  ADD CONSTRAINT `fk_Post_Category1` FOREIGN KEY (`categoryId`) REFERENCES `Category` (`categoryId`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_Post_Startup` FOREIGN KEY (`startup`) REFERENCES `Startup` (`startupId`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_Posts_Account1` FOREIGN KEY (`userId`) REFERENCES `Account` (`userId`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Beperkingen voor tabel `Privacy`
--
ALTER TABLE `Privacy`
  ADD CONSTRAINT `Account_userId` FOREIGN KEY (`userId`) REFERENCES `Account` (`userId`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Beperkingen voor tabel `Question`
--
ALTER TABLE `Question`
  ADD CONSTRAINT `bestReaction` FOREIGN KEY (`bestReaction`) REFERENCES `Post` (`postId`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `postId` FOREIGN KEY (`postId`) REFERENCES `Post` (`postId`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Beperkingen voor tabel `Startup`
--
ALTER TABLE `Startup`
  ADD CONSTRAINT `ownerId` FOREIGN KEY (`ownerId`) REFERENCES `Account` (`userId`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Beperkingen voor tabel `Startup_user`
--
ALTER TABLE `Startup_user`
  ADD CONSTRAINT `fk_Startup_has_Account_Account1` FOREIGN KEY (`userId`) REFERENCES `Account` (`userId`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_Startup_has_Account_Startup1` FOREIGN KEY (`startupId`) REFERENCES `Startup` (`startupId`) ON DELETE NO ACTION ON UPDATE NO ACTION;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
