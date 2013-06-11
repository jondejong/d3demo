modules = {

    jquery {
        resource url:'js/jquery-1.9.1.js'
        resource url:'js/jquery-ui.js'
    }

    application {
        resource url:'js/application.js'
    }

    bootstrap {
        resource url:'css/bootstrap.css'
        resource url:'css/bootstrap-responsive.css'
//        resource url:'js/bootstrap.js'
    }

    angular {
        resource url: 'js/angular.min.js'
        resource url: 'js/angular-resource.min.js'
        resource url:'js/angular-ui.js'
        resource url: 'css/angular-ui.css'
    }

    demoResources {
        resource url: 'js/resources.js'
    }

    d3 {
        resource url: 'js/d3.min.js'
    }

    d3demo {
        dependsOn(['angular', 'bootstrap', 'demoResources', 'd3'])
        resource url:'js/angular-controllers.js'
        resource url:'js/d3demo.js'
        resource url:'css/d3demo.css'
    }

}