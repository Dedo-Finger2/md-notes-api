class Right {
    #value

    constructor({ value }) {
        this.#value = value
    }

    isRight() {
        return true
    }

    isLeft() {
        return false
    }

    get value() {
        return this.#value
    }
}

class Left {
    #value

    constructor({ value }) {
        this.#value = value
    }

    isRight() {
        return false
    }

    isLeft() {
        return true
    }

    get value() {
        return this.#value
    }
}

export const right = (value) => new Right({ value })
export const left = (value) => new Left({ value })
