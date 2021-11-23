'use strict';

let assert = require("assert");
let TaxiTrips = require("../taxi-trips");
const pg = require("pg");
const Pool = pg.Pool;

const connectionString = process.env.DATABASE_URL || 'postgresql://postgres:moddy123@localhost:5432/taxi_base';

const pool = new Pool({
    connectionString
});

describe('Taxi Trips', function () {

    beforeEach(async function () {

        // delete from taxi and FK...CASCADE ON DELETE CASCADE
        await pool.query('DELETE FROM trips;');

        //insert into table?

        await pool.query('insert into trips(taxi_id, route_id) values(1, 2)');
        await pool.query('insert into trips(taxi_id, route_id) values(2, 2)');
        await pool.query('insert into trips(taxi_id, route_id) values(3, 2)');
        await pool.query('insert into trips(taxi_id, route_id) values(7, 3)');
        await pool.query('insert into trips(taxi_id, route_id) values(8, 3)');
        await pool.query('insert into trips(taxi_id, route_id) values(9, 3)');
        await pool.query('insert into trips(taxi_id, route_id) values(4, 1)');
        await pool.query('insert into trips(taxi_id, route_id) values(5, 1)');
        await pool.query('insert into trips(taxi_id, route_id) values(6, 1)');
        
    });

    it('should find how many trips all the taxis made', async function () {

        const taxiTrips = TaxiTrips(pool);

        assert.deepEqual({ count: '9' }, await taxiTrips.totalTripCount());

    });

    it('should find all the regions', async function () {

        const taxiTrips = TaxiTrips(pool);

        assert.deepStrictEqual([{ region_name: 'Durban' }, { region_name: 'Cape Town' }, { region_name: 'Gauteng' }], await taxiTrips.findAllRegions());

    });

    it('should find all the taxis for a region', async function () {
        const taxiTrips = TaxiTrips(pool);

        assert.deepStrictEqual([{
            reg_number: "DBN 123"
        },
            {
            reg_number: "DBN 124"
        },
         {
            reg_number: "DBN 128"
        }], await taxiTrips.findTaxisForRegion('Durban'));
        assert.deepStrictEqual([{
            reg_number: "CA 125"
        },
            {
            reg_number: "CA 126"
        },
         {
            reg_number: "CA 123"
        }], await taxiTrips.findTaxisForRegion('Cape Town'));

        assert.deepStrictEqual([{
            reg_number: "GP 123"
        },
            {
                reg_number: "GP 888"
            },
         {
            reg_number: "GP 889"
        }], await taxiTrips.findTaxisForRegion('Gauteng'));

    })

    it('should find all the trips for a reg number', async function () {

        const taxiTrips = TaxiTrips(pool);

        assert.deepStrictEqual([{ route_id: 2, taxi_id: 1 }], await taxiTrips.findTripsByRegNumber('CA 125'));
        assert.deepStrictEqual([{ route_id: 1, taxi_id: 5 }], await taxiTrips.findTripsByRegNumber('DBN 124'));

    });

    it('should find the total number of trips by region', async function () {

        const taxiTrips = TaxiTrips(pool);

        assert.deepStrictEqual('3', await taxiTrips.findTripsByRegion('Cape Town'));
        assert.deepStrictEqual('3', await taxiTrips.findTripsByRegion('Gauteng'));
        assert.deepStrictEqual('3', await taxiTrips.findTripsByRegion('Gauteng'));

    });

    it('find the total income for a given reg number', async function () {

        const taxiTrips = TaxiTrips(pool);
        assert.deepStrictEqual('12.00', await taxiTrips.findIncomeByRegNumber('CA 123'));
        assert.deepStrictEqual('14.50', await taxiTrips.findIncomeByRegNumber('DBN 123'));
    });

    it('find the total income for each taxi', async function () {

        const taxiTrips = TaxiTrips(pool);
        assert.deepStrictEqual([{}, {}, {}], taxiTrips.findTotalIncomePerTaxi());

    });

    it('find the total income for all the taxis', async function () {
        const taxiTrips = TaxiTrips(pool);
        assert.deepStrictEqual(0.00, taxiTrips.findTotalIncome());
    });


    after(function () {
        pool.end();
    });

});