# comic-viewer

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```


COMIC viewer
--------------------------------------

How to set up Backend Database 

Create the database using this mySQL script 


I'm using XAMPP for my databse. 


--------------------------------------
START OF MYSQL Script 
--------------------------------------
CREATE DATABASE praccomicdb;

Use praccomicdb;

-- Create Tables 
CREATE TABLE IF NOT EXISTS comic(
	  id int primary key auto_increment,
	  title varchar(255)not null
);
    
CREATE TABLE IF NOT EXISTS episode(
 id int primary key auto_increment,
 issueId int,
 comicId int,
 title varchar(255)not null,
  INDEX comic_ind (comicId),
  FOREIGN KEY (comicId)
  REFERENCES comic(id)
  ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS episodePage(
 id int primary key auto_increment,
 episodeId int,
 episodePageNum int, 
 imagePath varchar(255)not null,
  INDEX epi_ind (episodeId),
  FOREIGN KEY (episodeId)
  REFERENCES episode(id)
  ON DELETE CASCADE
);

-- Create Data 

INSERT INTO comic VALUES(1,'The Adventures of Dickie Dook Dyke and the Marshmallow Man');

SELECT * FROM comic;

INSERT INTO episode VALUES
(1,1,1, 'Moonside Cruise'), 
(2,2,1, 'Coffeehouse Rumble'), 
(3,3,1,'Krispy Hot American Glaze');

SELECT * FROM episode where id = 1;

INSERT INTO episodePage VALUES
(1,1,1,'../img/comic/episodes/ep01/ep01_pg01.png'),
(2,1,2,'../img/comic/episodes/ep01/ep01_pg02.png'),
(3,1,3,'../img/comic/episodes/ep01/ep01_pg03.png'),
(4,2,1,'../img/comic/episodes/ep01/ep01_pg04.png'),
(5,2,2,'../img/comic/episodes/ep01/ep01_pg08.png'),
(6,3,1,'../img/comic/episodes/ep01/ep01_pg01.png'), 
(7,3,2,'../img/comic/episodes/ep01/ep01_pg04.png');

SELECT * FROM episodePage WHERE episodeId=1;

SELECT * FROM episode ORDER BY id DESC LIMIT 1


--------------------------------------
END of MYSQL Script 
--------------------------------------