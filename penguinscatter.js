var promise = d3.json("classData.json");
promise.then(function(penguin)
{
    console.log("Class Data", penguin); 
};,
function(err)
{
    console.log("Error loading data", err);
});
