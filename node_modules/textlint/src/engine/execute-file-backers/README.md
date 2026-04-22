# execute-file-backers

These are `exeuteFile` middleware function.

Each backer vote YES or No to process `exeuteFile`.

Each backer should be implemented these methods.

## `shouldExecute({filePath}): boolean`

Should the `filePath` be executed? 
If anyone opposed(`return false`) backer exist, does't `executeFile`.

## `didExecute({filePath, results}): results`

After process.
