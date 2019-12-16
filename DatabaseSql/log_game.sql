# Tracking report for table `game`
# 2019-12-15 20:09:53

DROP TABLE IF EXISTS `game`;

CREATE TABLE `game` (
  `name` varchar(110) NOT NULL,
  `description` varchar(255) NOT NULL,
  `date` date NOT NULL,
  `time` time NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
INSERT INTO `game` (`name`, `description`, `date`, `time`) VALUES ('desct', 'desd', '', '');
INSERT INTO `game` (`name`, `description`, `date`, `time`) VALUES ('', 'zzazsx', '', '');