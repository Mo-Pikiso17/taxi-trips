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

        
        var taxi =  await pool.query('SELECT reg_number FROM taxi WHERE reg_number = $1', [regNumber]);
        // if(taxi.rows.length > 0){

        //     await pool.query('SELECT region_name FROM region WHERE id= $1', [id]);

        // }
        
    }

    async function findTripsByRegion(region) {

        var place =  await pool.query('SELECT reg_number FROM taxi');
         
        if(place.rows.length > 0){

            await pool.query('SELECT region_name FROM region WHERE id= $1', [region]);

        }

        
    }

    async function findIncomeByRegNumber(route, regNumber) {
        
        var taxi =  await pool.query('SELECT reg_number FROM taxi WHERE reg_number_id = $1', [regNumber]);
        var fare =  await pool.query('SELECT taxi_fare FROM route WHERE taxi_fare = $1', [route]);

    }

    async function findTotalIncomePerTaxi(params) {
        
    }

    async function findTotalIncome(params) {
        
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