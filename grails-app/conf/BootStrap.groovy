import d3demo.Module
import d3demo.SubModule

class BootStrap {

    def init = { servletContext ->

        def random = new Random()
        def letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J']

        for(parent in 0..9) {
            def level = 0

            def module = new Module(name: "Module ${letters[parent]}")

            for(sub in 0..5) {
                def subLevel =  random.nextInt(10);
                level += subLevel
                module.addToSubModules(new SubModule(name: "${letters[parent]} Submodule ${sub + 1}", level: subLevel))
            }
            module.level = level
            module.save(failOnError: true)
        }

    }
    def destroy = {
    }
}
