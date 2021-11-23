create table routes ( 
  id serial not null primary key,
  route_name text not null, 
  taxi_fare decimal (10,2) not null
);

create table region ( 
  id serial not null primary key,
  region_name text not null
);

create table taxi ( 
  id serial not null primary key,
  reg_number text not null, 
  region_id int,
  FOREIGN KEY(region_id) REFERENCES region(id)
);

create table trips ( 
  id serial not null primary key,
  taxi_id int,
  FOREIGN KEY(taxi_id) REFERENCES taxi(id)
  ON DELETE CASCADE,
  route_id int,
  FOREIGN KEY(route_id) REFERENCES routes(id)
  ON DELETE CASCADE
);



