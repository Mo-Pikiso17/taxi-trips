--Region Table

insert into region(id, region_name) values (1, 'Durban');
insert into region(id, region_name) values (2, 'Cape Town');
insert into region(id, region_name) values (3, 'Gauteng');

--Routes Table

insert into routes(route_name, taxi_fare) values('Cape Town-Bellville', 14.50);
insert into routes(route_name, taxi_fare) values('Cape Town-Gugulethu', 12.00);
insert into routes(route_name, taxi_fare) values('Cape Town-Langa', 8.00);
insert into routes(route_name, taxi_fare) values ('Sandton-Randburg', 15.00);
insert into routes(route_name, taxi_fare) values('Alexandra-Sandton', 17.00);
insert into routes(route_name, taxi_fare) values('Sandton-Midrand', 7.00);
insert into routes(route_name, taxi_fare) values ('Umlazi-Durban Central', 8.30);
insert into routes(route_name, taxi_fare) values('Durban Central-Umhlanga Rocks', 11.00);
insert into routes(route_name, taxi_fare) values('Durban Central-Umbilo', 20.00);


--Taxi Table

insert into taxi(reg_number, region_id) values('CA 125', 2);
insert into taxi(reg_number, region_id) values('CA 126', 2);
insert into taxi(reg_number, region_id) values('CA 123', 2);
insert into taxi(reg_number, region_id) values('DBN 123', 1);
insert into taxi(reg_number, region_id) values ('DBN 124', 1);
insert into taxi(reg_number, region_id) values('DBN 128', 1);
insert into taxi(reg_number, region_id) values('GP 123', 3);
insert into taxi(reg_number, region_id) values('GP 888', 3);
insert into taxi(reg_number, region_id) values('GP 889', 3);


-- Trips Table

insert into trips(taxi_id, route_id) values(1, 2);
insert into trips(taxi_id, route_id) values( 2, 2);
insert into trips(taxi_id, route_id) values(3, 2);
insert into trips(taxi_id, route_id) values (7, 3);
insert into trips(taxi_id, route_id) values(8, 3);
insert into trips(taxi_id, route_id) values(9, 3);
insert into trips(taxi_id, route_id) values(4, 1);
insert into trips(taxi_id, route_id) values (5, 1);
insert into trips(taxi_id, route_id) values(6, 1);