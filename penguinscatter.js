var setTitle = function(msg)
{
    d3.select("h1")
        .text(msg);
};

//mean HW
var getmeanhw = function(homework)
    {
     var hwgrades = homework.map(function(hw)
                                 {
                                    return hw.grade
                                })
        return d3.mean(hwgrades)
    };
//quiz mean
var getmeanquiz= function(quizes){
    var quizgrades= quizes.map(function(quiz){
        return quiz.grade
    })
    return d3.mean(quizgrades)
}; 
var getFinal = function(penguin)
{
    penguin.final[0].grade;
}

//get mean test grade
var getmeantest = function(test)
    {
        var testgrades = test.map(function(tests)
                                    {
                                    return tests.grade
                                    })
        return d3.mean(testgrades)
    };
var makePlot = function(penguin)
{
   var width = "600";
    var height = "300";

    var svg =  d3.select("svg")
                .attr("width", width)
                .attr("height", height);
    
    //scales
    var xScale = d3.scaleLinear()
                    .domain([d3.min(penguin,getmeanhw),
                            d3.max(penguin,getmeanhw)])
                    .range([0, width]);
    var yScale = d3.scaleLinear()
                    .domain([d3.min(penguin,getFinal),
                            d3.max(penguin,getFinal)])
                    .range([height, 0]);
    
    //dots
    svg.selectAll("svg")
        .data(penguin)
        .enter()
        .append("circle")
        .attr("cx", function(penguin)
             {
                return xScale(getmeanhw(penguin));
            })
        .attr("cy", function(penguin)
             {
                return yScale(getFinal(penguin));
            })
        .attr("r", 3)
        .attr("fill", black)
};






var success = function(penguins)
{
    console.log("Data Collected", penguins);
    makePlot(penguins);
};

var failure = function(error)
{
    console.log("Something is wrong", error);
};

var penguinPromise = d3.json("classData.json");
penguinPromise.then(success, failure)
