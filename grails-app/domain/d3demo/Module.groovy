package d3demo

class Module {

    String name
    BigDecimal level

    static hasMany = [subModules: SubModule, pastModules: PastModule]


    static constraints = {
    }
}
