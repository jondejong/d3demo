import d3demo.Module
import d3demo.SubModule
import d3demo.TimeIncrementMeasurement

class BootStrap {

    def init = { servletContext ->

        def random = new Random()
        def letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J']

        for(parent in 0..9) {
            def module = new Module(name: "Module ${letters[parent]}")

            def subsMap = [:]
            def subCount = random.nextInt(3) + 2

            for(sub in 0..subCount) {
                subsMap.put(sub, new SubModule(name: "${letters[parent]} Submodule ${sub + 1}"))
            }

            for(increment in 0..5) {
                for(sub in 0..subCount) {
                    SubModule subModule = subsMap.get(sub)
                    subModule.addToTimeIncrementMeasurements(new TimeIncrementMeasurement(incrementNumber: increment, level: random.nextInt(10) + 1))
                }
            }

            subsMap.values().each {SubModule subModule ->
                module.addToSubModules(subModule)
            }
            module.save(failOnError: true)
        }

    }
    def destroy = {
    }
}
