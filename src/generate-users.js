import { faker } from '@faker-js/faker'

function getRandomInt (min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min) + min)
}

const users = []

for (let i = 0; i < 1000; i++) {
  users.push({
    name: {
      first: faker.person.firstName(),
      last: faker.person.lastName()
    },
    login: {
      email: faker.internet.email(),
      password: faker.internet.password({ length: getRandomInt(12, 50) })
    },
    organization_id: faker.string.uuid(),
    requested_at: faker.date.anytime().toISOString()
  })
}

console.log(JSON.stringify(users))
