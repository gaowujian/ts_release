const Greeter = ({ name = "world" }) => <div>Hello, {name}!</div>;
// Properties get validated
let example = <Greeter name="TypeScript 1.8" />;
