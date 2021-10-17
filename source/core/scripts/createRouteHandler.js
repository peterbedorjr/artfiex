export default (uses, hooks = {}, name = undefined) => {
    const route = {
        uses,
    };

    if (Object.keys(hooks).length) {
        route.hooks = hooks;
    }

    if (name) {
        route.as = name;
    }

    return route;
};
