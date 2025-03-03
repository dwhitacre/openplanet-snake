create table Players(
  AccountId varchar not null primary key,
  Name varchar not null default '',
  Color varchar not null default '3F3',
  DisplayName varchar not null default '',
  DateModified timestamp not null default (now() at time zone 'utc')
);

create table GameModes(
  Id varchar not null primary key,
  Name varchar not null,
  DateModified timestamp not null default (now() at time zone 'utc'),
  unique(Name)
);

create table GameModeScores(
  Id serial primary key,
  AccountId varchar not null,
  GameModeId varchar not null,
  Score int not null,
  DateModified timestamp not null default (now() at time zone 'utc'),
  foreign key(AccountId) references Players(AccountId),
  foreign key(GameModeId) references GameModes(Id)
);

create table Leaderboards(
  Id varchar not null primary key,
  Name varchar not null,
  DateModified timestamp not null default (now() at time zone 'utc'),
  unique(Name)
);

create table LeaderboardGameModes(
  Id serial primary key,
  LeaderboardId varchar not null,
  GameModeId varchar not null,
  DateModified timestamp not null default (now() at time zone 'utc'),
  foreign key(LeaderboardId) references Leaderboards(Id),
  foreign key(GameModeId) references GameModes(Id),
  unique(LeaderboardId, GameModeId)
);

create table Permissions(
  Id serial primary key,
  Name varchar not null
);

insert into Permissions(Name)
values
  ('view'),
  ('player:manage'),
  ('gamemode:manage'),
  ('leaderboard:manage'),
  ('apikey:manage'),
  ('admin');

create table PlayerPermissions(
  Id serial primary key,
  AccountId varchar not null,
  PermissionId int not null,
  DateModified timestamp not null default (now() at time zone 'utc'),
  foreign key(AccountId) references Players(AccountId),
  foreign key(PermissionId) references Permissions(Id),
  unique(AccountId, PermissionId)
);

create table ApiKeys(
  Id serial primary key,
  AccountId varchar not null,
  Key varchar not null,
  DateModified timestamp not null default (now() at time zone 'utc'),
  foreign key(AccountId) references Players(AccountId),
  unique(AccountId)
);

---- create above / drop below ----

drop table ApiKeys;
drop table PlayerPermissions;
drop table Permissions;
drop table LeaderboardGameModes;
drop table Leaderboards;
drop table GameModeScores;
drop table GameModes;
drop table Players;
