package d3demo

import grails.converters.JSON

class ModuleController {

    def list() {
        def responseJSON = [:]

        def modules = Module.findAll()

        responseJSON.modules = []

        modules.each { Module module ->
            def timeLevels = [:]
            def moduleMap = [name: module.name, subModules: []]
            module.subModules.each { SubModule subModule ->
                def subModuleMap = [name: subModule.name, timeIncrementMeasurements: []]
                def timeIncrementtMap = [:]
                subModule.timeIncrementMeasurements.each {

                    // Add total to parent
                    if (!timeLevels.get(it.incrementNumber)) {
                        timeLevels[it.incrementNumber] = 0.0
                    }

                    timeLevels[it.incrementNumber] = timeLevels[it.incrementNumber] + it.level

                    // Store it
                    timeIncrementtMap.put(it.incrementNumber, it.level)

                }
                // done with increments. add them to submodule
                def keys = timeIncrementtMap.keySet().sort{a,b-> a.compareTo(b)}
                keys.each {
                    subModuleMap.timeIncrementMeasurements.add(["${it}": timeIncrementtMap.get(it)])
                }

                subModuleMap.level = timeIncrementtMap.get(keys.get(keys[keys.size() - 1]))

                // add submodule to parent
                moduleMap.subModules.add(subModuleMap)
            }
            moduleMap.subModules = moduleMap.subModules.sort { a, b -> a.name.compareTo(b.name) }

            def times = []
            timeLevels.keySet().each {
                times.add(it)
            }
            times.sort { a, b -> a.compareTo(b) }
            def level = timeLevels.get(times.get(times.size() - 1))
            moduleMap.timeIncrementMeasurements = timeLevels
            moduleMap.level = level

            responseJSON.modules.add(moduleMap)
        }

        render responseJSON as JSON
    }
}
