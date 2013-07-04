package d3demo

class Module {

    String name

    static hasMany = [subModules: SubModule]

    static mapping = {
        timeIncrements lazy: false
    }

    static constraints = {
    }
}
