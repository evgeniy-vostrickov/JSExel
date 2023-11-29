console.log('Module JS')

const test = async () => {
  return await Promise.resolve('Hello from Promise!')
}

test().then(console.log)
