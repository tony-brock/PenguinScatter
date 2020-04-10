//set Title differently for each different plot
var setTitle = function(msg)
{
    d3.select("h1")
        .text(msg);
};

//mean HW
var getmeanhw = function(penguin)
    {
     var hwgrades = penguin.homework.map(function(hw)
                                 {
                                    return hw.grade
                                });
    return d3.mean(hwgrades)
    };
//quiz mean
var getmeanquiz= function(penguin)
{
    var quizgrades= penguin.quizes.map(function(quiz){
        return quiz.grade
    })
    return d3.mean(quizgrades)
}; 

//get mean test grade
var getmeantest = function(penguin)
    {
        var testgrades = penguin.test.map(function(tests)
                                    {
                                    return tests.grade
                                    })
        return d3.mean(testgrades)
    };
//get grade on Final
var getFinal = function(penguin)
{
    var finalgrade = penguin.final.map(function(fin)
                                      {
                                        return fin.grade
    })
    return finalgrade;
}

//sort by property
var sortProperty = function(property)
{
    return function(a,b)
    {
        if(a[property] == b[property])
            {return 0}
        else if(a[property] < b[property])
            {return 1}
        else 
            {return -1}
    }
};

var makeFinalvHWPlot = function(penguin)
{
    //set Title within
    setTitle("Grade on Final vs Mean Homework Grade")
   var width = "600";
    var height = "300";

    var svg =  d3.select("svg")
                .attr("width", width)
                .attr("height", height)
                .attr("id","graph")
    
    //scales
    var xScale = d3.scaleLinear()
                    .domain([d3.min(penguin,getFinal),
                            d3.max(penguin,getFinal)])
                    .range([0, width]);
    var yScale = d3.scaleLinear()
                    .domain([d3.min(penguin,getmeanhw),
                            d3.max(penguin,getmeanhw)])
                    .range([height, 0]);
    
    //dots
    svg.selectAll("circle")
        .data(penguin)
        .enter()
        .append("circle")
        .attr("cx", function(penguin)
             {
                return xScale(getFinal(penguin));
            })
        .attr("cy", function(penguin)
             {
                return yScale(getmeanhw(penguin));
            })
        .attr("r", 3)
        .attr("fill", "black");
};

    
var makeHWvQuizPlot= function(penguin)
{
    setTitle("Homework Mean vs Quiz Mean Grade")
    var width = "600";
    var height = "300";
    
    var svg = d3.select("svg")
        .attr("width", width)
        .attr("height", height)
        .attr("id", "graph")
    
    var xScale= d3.scaleLinear()
    .domain([d3.min(penguin,getmeanhw),
            d3.max(penguin,getmeanhw)])
    .range([0, width]); 
    var yScale= d3.scaleLinear()
        .domain([d3.min(penguin,getmeanquiz),
                 d3.max(penguin,getmeanquiz)])
        .range([height, 0]);
    
    svg.selectAll("circle")
        .data(penguin)
        .enter()
        .append("circle")
        .attr("cx",function(penguin)
              {
        return xScale(getmeanhw(penguin))
        })
        
        .attr("cy",function(penguin)
              {
              return yScale(getmeanquiz(penguin))
                })
                
        .attr("r", 3)   
        .attr("fill", "red");
};

var makeFinalvTestPlot = function(penguin)
{
    //set Title within
    setTitle("Grade on Final vs Mean Test Grade")
   var width = "600";
    var height = "300";

    var svg =  d3.select("svg")
                .attr("width", width)
                .attr("height", height)
                .attr("id","graph")
    
    //scales
    var xScale = d3.scaleLinear()
                    .domain([d3.min(penguin,getFinal),
                            d3.max(penguin,getFinal)])
                    .range([0, width]);
    var yScale = d3.scaleLinear()
                    .domain([d3.min(penguin,getmeantest),
                            d3.max(penguin,getmeantest)])
                    .range([height, 0]);
    
    //dots
    svg.selectAll("circle")
        .data(penguin)
        .enter()
        .append("circle")
        .attr("cx", function(penguin)
             {
                return xScale(getFinal(penguin));
            })
        .attr("cy", function(penguin)
             {
                return yScale(getmeantest(penguin));
            })
        .attr("r", 3)
        .attr("fill", "green");
};
    
var makeQuizvTestPlot= function(penguin){
    
    setTitle("Mean Quiz Grade vs Mean Test Grade")  
    var width= "600";
    var height= "300";
    
    var xScale= d3.scaleLinear()
        .domain ([d3.min(penguin,getmeanquiz), d3.max(penguin,getmeanquiz)])
        .range([0, width]);
    var yScale= d3.scaleLinear()
        .domain([d3.min(penguin, getmeantest), d3.max(penguin, getmeantest)])
        .range ([height, 0])
    
    var svg= d3.selectAll("svg")
        .attr("width", width)
        .attr("height", height)
        .attr( "id","graph")
        
        svg.selectAll("circle")
        .data(penguin)
        .enter()
        .append("circle")
        .attr("cx", function(penguin){
            return xScale(getmeanquiz(penguin))
        })
        .attr("cy", function(penguin){
            return yScale(getmeantest(penguin))
        })
        .attr("r", 3)
        .attr("fill", "orange")
    ;
}


//clear page
var clearpage = function(){
d3.selectAll("circle")
    .remove()
}
//button finalvhw
var buttonchange= function(penguins){
d3.select("#FinalvHw")
    .on("click", function(){
    clearpage();
    makeFinalvHWPlot(penguins)});

d3.select("#HwvQuiz")
        .on("click", function(){
        clearpage();
        makeHWvQuizPlot(penguins)
})};

//don't need to touch svg or "cx"
    
//promise
var success = function(penguins)
{
    console.log("Data Collected", penguins);
    penguins.sort(sortProperty("picture"));
    makeQuizvTestPlot(penguins);
    buttonchange(penguins);
};

var failure = function(error)
{
    console.log("Something is wrong", error);
};

var penguinPromise = d3.json("classData.json");
penguinPromise.then(success, failure)
