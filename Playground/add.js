function addMe(a,b) {
    if (a === undefined || b === undefined) {
        throw new Error(`Needs atleast two inputs...`)
    }
    
    return a + b;
}

export { addMe };