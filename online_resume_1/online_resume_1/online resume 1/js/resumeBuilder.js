var bio = {
    "name": "Arjot Kaur",
    "role": "Front-End Web Developer",
    "contacts": {
        "email": "kaur.arjot@gmail.com",
        "github": "arjotkaur",
        "mobile": "8427683547",
        "twitter": "@kaur95",
        "location": "Patiala"
    },
    "welcomeMessage": "She guarded herself like a SECRET..!",
    "skills": ["C#", "C", "C++" , "HTML", "CSS", "Javascript", "Phyton"],
    "biopic": "images/mypic.jpg"
};
var work = {
    "jobs": [
        {
            "employer": "Chitkara University",
            "title": "Student",
            "dates": "2014-2018",
            "description": "Pursuing BE in Cse",
            "location": "Punjab"
        }
    ]
};
var education = {
    "schools": [
        {
            "name": "Chitkara University",
            "location": "Rajpura,Punjab",
            "degree": "BE",
            "majors": ["CS"],
            "dates": "2014-2018",
            "url" : "#"

        }

    ],
    "onlineCourses": [
        {
            "title": "Intro to Html and CSS",
            "school": "Udacity",
            "dates": "2017",
            "url": "https://in.udacity.com/course/intro-to-html-and-css--ud304/"
        }
    ]
};

work.display = function () {

    for (var job = 0; job < work.jobs.length; job++) { 
        $("#workExperience").append(HTMLworkStart);

        var formattedEmployer = HTMLworkEmployer.replace("%data%", work.jobs[job].employer);
        var formattedTitle = HTMLworkTitle.replace("%data%", work.jobs[job].title);
        var formattedEmployerTitle = formattedEmployer + formattedTitle;
        $(".work-entry:last").append(formattedEmployerTitle);

        var formattedDates = HTMLworkDates.replace("%data%", work.jobs[job].dates);
        $(".work-entry:last").append(formattedDates);

        var formattedDescription = HTMLworkDescription.replace("%data%", work.jobs[job].description);
        $(".work-entry:last").append(formattedDescription);
        var formattedLocation = HTMLworkLocation.replace("%data%", work.jobs[job].location);
        $(".work-entry:last").append(formattedLocation);
    }
};
work.display();


bio.display = function () {
    $("#header").prepend(HTMLbioPic.replace("%data%", bio.biopic));
    $("#header").prepend(HTMLheaderName.replace("%data%", bio.name), HTMLheaderRole.replace("%data%", bio.role));
    $("#header").append(HTMLwelcomeMsg.replace("%data%", bio.welcomeMessage));
    formattedContactInfo = [];
    formattedContactInfo.push(HTMLmobile.replace('%data%', bio.contacts.mobile));
    formattedContactInfo.push(HTMLemail.replace('%data%', bio.contacts.email));
    formattedContactInfo.push(HTMLgithub.replace('%data%', bio.contacts.github));
    formattedContactInfo.push(HTMLtwitter.replace('%data%', bio.contacts.twitter));
    formattedContactInfo.push(HTMLlocation.replace('%data%', bio.contacts.location));

    if (bio.skills.length > 0) {
        $("#header").append(HTMLskillsStart);

        for (var i = 0; i < bio.skills.length; i++) {
            $("#skills").append(HTMLskills.replace("%data%", bio.skills[i]));
        }

    }
    for (k in formattedContactInfo) {

        $("#topContacts").append(formattedContactInfo[k]);
        $("#footerContacts").append(formattedContactInfo[k]);
    }
};
bio.display();


education.display = function () {
    for (var i = 0; i < education.schools.length; i++) {
        $("#education").append(HTMLschoolStart);
        $(".education-entry:last").append(HTMLschoolName.replace("%data%", education.schools[i].name) +
            HTMLschoolDegree.replace("%data%", education.schools[i].degree),
            HTMLschoolDates.replace("%data%", education.schools[i].dates),
            HTMLschoolLocation.replace("%data%", education.schools[i].location),
            HTMLschoolMajor.replace("%data%", education.schools[i].majors));
    }

    $("#education").append(HTMLonlineClasses);

    for (var course = 0; course < education.onlineCourses.length; course++) {
        $("#education").append(HTMLschoolStart);
        $(".education-entry:last").append(HTMLonlineTitle.replace("%data%", education.onlineCourses[course].title) + HTMLonlineSchool.replace("%data%", education.onlineCourses[course].school), HTMLonlineDates.replace("%data%", education.onlineCourses[course].dates), HTMLonlineURL.replace("%data%", education.onlineCourses[course].url).replace("#", education.onlineCourses[course].url));
    }
};
education.display();

$(document).click(function (loc) {
    var x = loc.pageX;
    var y = loc.pageY;
    logClicks(x, y);
});



var projects = {

    "projects": [
        {
            "title": " Animal-card-master",
            "dates": "Semester 5<sup>th</sup> 2017",
            "description": "It is a responsive animal-master-card layout that displays detailed information about animals",
            "images": ["images/portfolio.png"]
        },

        {
            "title": "4-way traffic control",
            "dates": "Semester 3<sup>th</sup> 2016",
            "description": "The project involves controlling the project from 4-ways.This project includes bread board,LED's,resistors,capacitors,wires.",
            "images": ["images/poste1.jpg"]
        },

        {
            "title": "Mobile Detector",
            "dates": "Semester 1<sup>nd</sup> 2015",
            "description": "It includes the detection of mobile phone from within a specific range(1m to 10m).When a person calls the other person the the LED starts to blink and it starts to produce the sound.",
            "images": ["images/automatic.jpg"]
        },

     ]
};


projects.display = function () {

    for (var project = 0; project < projects.projects.length; project++) {
        $("#projects").append(HTMLprojectStart);
        $(".project-entry:last").append(HTMLprojectTitle.replace("%data%", projects.projects[project].title), HTMLprojectDates.replace("%data%", projects.projects[project].dates) + HTMLprojectDescription.replace("%data%", projects.projects[project].description));
        if (projects.projects[project].images.length > 0) {
            for (var image = 0; image < projects.projects[project].images.length; image++)
                $(".project-entry:last").append(HTMLprojectImage.replace("%data%", projects.projects[project].images[image]));
        }

    }
};

projects.display();
$("#mapDiv").append(googleMap);
