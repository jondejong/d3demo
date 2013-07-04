package d3demo

import grails.converters.JSON

class ModuleController {

    def list() {
        def responseJSON = [:]

        def modules = Module.findAll()

        responseJSON.modules = []

        modules.each { Module module->
            def timeLevels = [:]
            def moduleMap = [name: module.name, subModules: []]
            module.subModules.each {SubModule subModule->
                subModule.timeIncrementMeasurements.each{
                    if(!timeLevels.get(it.incrementNumber)) {
                        timeLevels.put(it.incrementNumber, 0.0)
                    }
                    timeLevels.put(it.incrementNumber, timeLevels.get(it.incrementNumber) + it.level)
                }
                moduleMap.subModules.add([name: subModule.name])
            }
            moduleMap.subModules = moduleMap.subModules.sort{a,b-> a.name.compareTo(b.name)}

            def times = []
            timeLevels.keySet().each {
                times.add(it)
            }
            times.sort { a, b-> a.compareTo(b)}
            def level = timeLevels.get(times.get(times.size() - 1))
            moduleMap.level = level
            responseJSON.modules.add(moduleMap)
        }

        render responseJSON as JSON
    }
}
