# Refactoring

You've been asked to refactor the function `deterministicPartitionKey` in [`dpk.js`](dpk.js) to make it easier to read and understand without changing its functionality. For this task, you should:

1. Write unit tests to cover the existing functionality and ensure that your refactor doesn't break it. We typically use `jest`, but if you have another library you prefer, feel free to use it.
2. Refactor the function to be as "clean" and "readable" as possible. There are many valid ways to define those words - use your own personal definitions, but be prepared to defend them. Note that we do like to use the latest JS language features when applicable.
3. Write up a brief (~1 paragraph) explanation of why you made the choices you did and why specifically your version is more "readable" than the original.

You will be graded on the exhaustiveness and quality of your unit tests, the depth of your refactor, and the level of insight into your thought process provided by the written explanation.

## Your Explanation Here

Changes on function level:
1. Renamed `TRIVIAL_PARTITION_KEY` to `DEFAULT_PARTITION_KEY`. This constant is being treated as a default in the code, that is, if partitionKey("candidate" in original code) is undefined, it is set to this value. Hence, the const is renamed to reflect that.
2. Move `DEFAULT_PARTITION_KEY` and `MAX_PARTITION_KEY_LENGTH` to a separate constants file. In general, its a good practice to abstract constants separately - either in one file or in separate files under constants folder depending on project. This provides more modularity and organization. Its easier to find all constants if there are in one place. Also, many times the constants may be reused in other functions so having it stored at one place provides reusability and maintainability if we need to ever alter the values.
3. Renamed `candidate` to `partitionKey` since to reflect the value it actually holds - partition key.
4. Simplify the assignment of partitionKey. As per the logic, we try to deduce partitionKey from event if it exists - either get it directly from event `partitionKey` property or calculate it based on event `data` property. In the original code it is achieved in if..else loop and the default is set in the next if..else loop. The assignment is scattered. The current code uses ternary operator to set it in one place such as the logic is clear at a glance making it more clean and readable.
5. The JSON stringification and hash calculation for `partitionKey` are combined into a single line making the code cleaner.
6. The existing code tries to directly stringify the `partitionKey` in case its not a string. This can cause issues if the event object happens to contain a non-string and non-object value. Since the type is not defined in our case, we must account for other types as well to prevent runtime errors. The refactored code checks and handles all types.

Changes of project level:
1. Create constants file and move constants to it(explained above)
2. Set "main" in package.json so the app runs correctly on `npm start`