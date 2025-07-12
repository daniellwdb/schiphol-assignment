# Author notes

I spent about 5 hours in total on this assignment. `@tanstack/react-table` is a library that I have not used before, but I thought it was interesting and from a quick glance, I saw that it had all the features I would need to implement the functionality described below. I used it's client side filtering capabilities because the size of provided mock data does not impact performance.

Additionally I decided to use Remix as it's used internally. For testing I use react-testing-library for obvious reasons and Vitest because I have not had the chance to use it before, but I like how little setup it requires and I am happy with it's performance.

If I had more time I would:

- Add status indicators in the table (delayed, on time etc.) using the provided colours in `colors.css` depending on expected / original departure time.
- Create a more realistic backend and use loading indicators in the frontend.
- Have some integration test with either react-testing-library or cypress.
- Not rely on the loader return type in the index file inside components and create a decoupled flights type instead.

# Assignment

Please create a page that contains an input field.
When the user enters _at least_ three characters into this input field,
you should display all flight information from the `flights.json` file where the destination airport matches the entered input.
Limit the search result to a maximum of 5 flights.

Please implement it using React. Try to keep it simple.

We think 4 hours should be enough to spend on this assignment.
Please don't spend more than that unless you're having fun and want to show off :)

## Requirements:

- Use React. Create your app with React but try to limit the use of third party UI libraries.
- Use Typescript. Make sure your app is typed correctly.
- Make it look nice. Make use of the provided colors. How you want to implement them is entirely your choice ;)
- Your application should treat the contents of `flights.json` as the output of an API endpoint.
  It should load this asynchronously using XHR or Fetch API and should not require a page reload when the user changes their input.
- Make sure the results are sortable. The filtered flight data should be sortable on date and (expected) time. Initial expected sorting is early to late.

## Submission:

- Create a clone of this repository locally.
  Then push it to **your GitHub account** and continue working from there.
  Once you have finished, please send us the URL of the repository you have created.

### Some things to consider:

- We like DRY and KISS
- We like tested code
- We like readable code
- We like using the latest features of ES6 where applicable
- Last but not least, have fun!
