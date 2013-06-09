package d3demo

import grails.converters.JSON

class ModuleController {

    def list() {render Module.findAll() as JSON}
}
