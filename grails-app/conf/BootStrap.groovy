import d3demo.Module

class BootStrap {

    def init = { servletContext ->

        for(i in 0..9) {
            new Module(name: "Module #${i}", level: 5 * i ).save(failOnError: true)
        }

    }
    def destroy = {
    }
}
