const express = require('express')
const { animals } = require('./data/animals')

const app = express()

const filterByQuery = (query, animalsArray) => {
    let personalityTraitsArray = []
    // Note that we save the animalsArray as filteredResults here
    let filteredResults = animalsArray
    if(query.personalityTraits) {
        // save personality traits as a dedicated array
        // If personality traits is a string, place it into a new array and save
        if(typeof query.personalityTraits === 'string') {
            personalityTraitsArray = [query.personalityTraits]
        } else {
            personalityTraitsArray = query.personalityTraits
        }
        //Loop through each trait in the personalityTraits array
        personalityTraitsArray.forEach(trait => {
            // check the trait against each animal in the filteredResults array
            filteredResults = filteredResults.filter(
                animal => animal.personalityTraits.indexOf(trait) !== -1
            )
        })
    }
    if (query.diet) {
        filteredResults = filteredResults.filter(animal => animal.diet === query.diet)
    }

    if (query.species) {
        filteredResults = filteredResults.filter(animal => animal.species === query.species)
    }

    if (query.name) {
        filteredResults = filteredResults.filter(animal => animal.name === query.name)
    }

    return filteredResults
}

app.get('/api/animals', (req, res) => {
    let results = animals
    if (req.query) {
        results = filterByQuery(req.query, results)
    }
    res.json(results)
})

app.listen(3001, () => {
    console.log('API server now on port 3001!')
})