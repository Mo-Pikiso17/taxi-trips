'use strict';

let assert = require("assert");
let TaxiTrips = require("../taxi-trips");
const pg = require("pg");
const Pool = pg.Pool;

const connectionString = process.env.DATABASE_URL || 'postgresql://localhost:5432/taxi_base';

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

        assert.equal(0, taxiTrips.totalTripCount());
    
    });

    it('should find all the regions', async function () {

        const taxiTrips = TaxiTrips(pool);

        assert.deepStrictEqual([], taxiTrips.findAllRegions());

    });

    it('should find all the taxis for a region', async function () {
        const taxiTrips = TaxiTrips(pool);

        assert.deepStrictEqual([], taxiTrips.findTaxisForRegion('Durban'));
        assert.deepStrictEqual([], taxiTrips.findTaxisForRegion('Cape Town'));
        assert.deepStrictEqual([], taxiTrips.findTaxisForRegion('Gauteng'));

    })

    it('should find all the trips for a reg number', async function () {

        const taxiTrips = TaxiTrips(pool);
        
        assert.deepStrictEqual([], taxiTrips.findTripsByRegNumber('...'));
        assert.deepStrictEqual([], taxiTrips.findTripsByRegNumber('***'));

    });

    it('should find the total number of trips by region', async function () {

        const taxiTrips = TaxiTrips(pool);

        assert.deepStrictEqual([], taxiTrips.findTripsByRegion('Cape Town').length);
        assert.deepStrictEqual([], taxiTrips.findTripsByRegion('Gauteng').length);
        assert.deepStrictEqual([], taxiTrips.findTripsByRegion('Gauteng').length);

    });

    it('find the total income for a given reg number', async function () {

        const taxiTrips = TaxiTrips(pool);
        assert.deepStrictEqual(0, taxiTrips.findIncomeByRegNumber('...').length);
        assert.deepStrictEqual(0, taxiTrips.findIncomeByRegNumber('***').length);

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