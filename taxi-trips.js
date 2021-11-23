// const { Query } = require("pg")

module.exports = function TaxiTrips(pool) {

    async function totalTripCount() {

       var sumTrip =  await pool.query('SELECT count(*) from trips');
        return sumTrip.rows[0];
    }

    async function findAllRegions() {

        var region = await pool.query('SELECT region_name FROM region');
        return region.rows

}

    async function findTaxisForRegion(region){

        var place =  await pool.query('SELECT id FROM region WHERE region_name = $1', [region]);
        var placeId = place.rows[0].id;

        var taxi =  await pool.query('SELECT reg_number FROM taxi WHERE region_id = $1', [placeId]);

        return taxi.rows;

    }


    async function findTripsByRegNumber(regNumber) {

        
        var taxi =  await pool.query('SELECT id FROM taxi WHERE reg_number = $1', [regNumber]);
        // id from taxi
        var id = taxi.rows[0].id

        var trips =  await pool.query('SELECT taxi_id,route_id FROM trips WHERE taxi_id = $1', [id]);

        return trips.rows   
    }

    async function findTripsByRegion(region) {

        var taxi =  await pool.query('SELECT id FROM region WHERE region_name = $1', [region]);
        // id from taxi
        var id = taxi.rows[0].id
       // return count
        var regionCount =  await pool.query('SELECT count(region_id) AS rcount FROM taxi WHERE region_id = $1', [id]);

        return regionCount.rows[0].rcount

        
    }

    async function findIncomeByRegNumber(regNumber) {
        // get taxi id
        // use it when getting route_id
        // use route_id to get taxi fare from routes table

        var taxi =  await pool.query('SELECT id FROM taxi WHERE reg_number= $1', [regNumber]);
        var taxiId = taxi.rows[0].id

        var route =  await pool.query('SELECT route_id FROM trips WHERE taxi_id= $1', [taxiId]);
        var routeId = route.rows[0].route_id


        var routeFare =  await pool.query('SELECT sum(taxi_fare) as tIncome FROM routes WHERE id = $1', [routeId]);
        return routeFare.rows[0].tincome;

    }

    async function findTotalIncomePerTaxi(params) {
    // might need to use inner join to extract data from trips and routes??
    }

    async function findTotalIncome(params) {
    // might need to use inner join to extract data from trips and routes??

    }

    return{
        totalTripCount,
        findTaxisForRegion,
        findAllRegions,
        findTripsByRegNumber,
        findTripsByRegion,
        findIncomeByRegNumber,
        findTotalIncomePerTaxi,
        findTotalIncome
    }
	
}