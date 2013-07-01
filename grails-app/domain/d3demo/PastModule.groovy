package d3demo

class PastModule {

    TimeIncrement timeIncrement
    BigDecimal level

    static hasMany = [subModules: SubModule]

    static constraints = {
    }
}
