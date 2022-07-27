
import { mount } from '@vue/test-utils';

import Main from './components/Main';
import About from './components/views/About';
import Error from './components/views/Error';
import Hello from './components/views/Hello';
import Index from './components/views/Index';

import { createRouter } from '../src';

function init({ base = '', wildcard = true } = {}) {
    const router = createRouter({
        base,
        routes: [
            { path: '/', component: Index, name: 'index' },
            { path: '/about', component: About, name: 'about' },
            { path: '/hello/:user_name', component: Hello, name: 'hello' },
            { path: '/greetings/:user_name', component: Hello, props: { title: 'Greetings' }, name: 'greetings' },
            { path: '/forbidden', component: Error, props: { code: 403 }, meta: { login_required: true } },
            { path: wildcard ? '*' : '/404', component: Error, props: { code: 404 } },
        ],
    });
    return mount(Main, { global: { plugins: [router] } });
}

test('index view is rendered initially', () => {
    const wrapper = init();
    expect(wrapper.find('#view').text()).toBe('Index page');
});

test('$router and $route objects are available in components', () => {
    const wrapper = init();
    expect(wrapper.vm.$route.name).toBe('index');
    expect(wrapper.vm.$route.path).toBe('/');
    expect(wrapper.vm.$route.query).toEqual({});
    expect(wrapper.vm.$route.hash).toBe('');
    expect(wrapper.vm.$route).toBe(wrapper.vm.$router.route);
    expect(wrapper.findComponent(Index).vm.$router).toBe(wrapper.vm.$router);
    expect(wrapper.findComponent(Index).vm.$route).toBe(wrapper.vm.$route);
});

test('reverse URL resolving works', () => {
    const wrapper = init();
    expect(wrapper.vm.$router.resolve('index')).toBe('/');
    expect(wrapper.vm.$url('hello', { user_name: 'test' })).toBe('/hello/test');
    expect(wrapper.vm.$router.resolve('index', { answer: 42 })).toBe('/?answer=42');
    expect(wrapper.vm.$url('greetings', { search: 'abc&xyz', user_name: 'john' })).toBe('/greetings/john?search=abc%26xyz');
});

test('history and location are properly managed on navigation', async () => {
    // This test should be run before any other navigation tests, so that the numbers are correct.
    // https://github.com/facebook/jest/issues/1224
    const wrapper = init();
    expect(history.length).toBe(1);
    expect(location.pathname).toBe('/');

    await wrapper.vm.$router.push('/');
    expect(history.length).toBe(1);

    await wrapper.vm.$router.push('/hello/world');
    expect(history.length).toBe(2);
    expect(location.pathname).toBe('/hello/world');

    for (let i = 0; i < 2; ++i) {
        await wrapper.find('a.about').trigger('click');
        expect(history.length).toBe(3);
        expect(location.pathname).toBe('/about');
    }

    for (let i = 0; i < 2; ++i) {
        await wrapper.vm.$router.push('/about?query');
        expect(history.length).toBe(4);
        expect(location.search).toBe('?query');
    }

    for (let i = 0; i < 2; ++i) {
        await wrapper.vm.$router.push('/about?query#hash');
        expect(history.length).toBe(5);
        expect(location.hash).toBe('#hash');
    }
});

test('query strings and hash fragments are properly handled', async () => {
    const wrapper = init();

    await wrapper.vm.$router.push('/?test&value=qwerty&encoded=%26+%3F#anchor');
    expect(wrapper.vm.$route.query.test).toBe('');
    expect(wrapper.vm.$route.query.value).toBe('qwerty');
    expect(wrapper.vm.$route.query.encoded).toBe('& ?');
    expect(wrapper.vm.$route.query.anchor).toBeUndefined();
    expect(wrapper.vm.$route.hash).toBe('#anchor');
});

test('router listens to popstate event', async () => {
    // `history.back()` doesn't seem to work in jsdom.
    // https://github.com/jsdom/jsdom/issues/1565
    window.addEventListener = jest.fn();

    const wrapper = init();
    expect(window.addEventListener).toHaveBeenCalledWith('popstate', expect.any(Function));
    expect(wrapper.vm.$route.key).toBe(1);
    expect(wrapper.emitted()['route-changed']).toBeUndefined();

    window.addEventListener.mock.calls[0][1]();
    expect(wrapper.vm.$route.key).toBe(2);
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted()['route-changed']).toHaveLength(1);
});

test('clicking a link navigates to another view', async () => {
    const wrapper = init();

    await wrapper.find('a.about').trigger('click');
    expect(wrapper.find('#view').text()).toBe('About page');
    expect(wrapper.vm.$route.name).toBe('about');
    expect(wrapper.emitted()['route-changed']).toHaveLength(1);

    await wrapper.find('a.index').trigger('click');
    expect(wrapper.find('#view').text()).toBe('Index page');
    expect(wrapper.vm.$route.name).toBe('index');
    expect(wrapper.emitted()['route-changed']).toHaveLength(2);
});

test('clicking an active link recreates the view', async () => {
    const wrapper = init();
    expect(wrapper.findComponent(Index).vm.number).toBe(0);
    expect(wrapper.findComponent(Index).vm.created).toBe(true);

    await wrapper.findComponent(Index).setData({ number: 42, created: false });
    expect(wrapper.findComponent(Index).vm.number).toBe(42);
    expect(wrapper.findComponent(Index).vm.created).toBe(false);
    expect(wrapper.emitted()['route-changed']).toBeUndefined();

    await wrapper.find('a.index').trigger('click');
    expect(wrapper.findComponent(Index).vm.number).toBe(0);
    expect(wrapper.findComponent(Index).vm.created).toBe(true);
    expect(wrapper.emitted()['route-changed'].length).toBe(1);
});

test('parameters are properly passed to components', async () => {
    const wrapper = init();
    expect(wrapper.vm.$route.params).toEqual({});

    await wrapper.vm.$router.push('/hello/world');
    expect(wrapper.find('#view').text()).toBe('Hello, world!');
    expect(wrapper.findComponent(Hello).vm.title).toBe('Hello');
    expect(wrapper.findComponent(Hello).vm.user_name).toBe('world');
    expect(wrapper.vm.$route.name).toBe('hello');
    expect(wrapper.vm.$route.params).toEqual({ user_name: 'world' });

    await wrapper.vm.$router.push('/greetings/test_123');
    expect(wrapper.find('#view').text()).toBe('Greetings, test_123!');
    expect(wrapper.findComponent(Hello).vm.title).toBe('Greetings');
    expect(wrapper.findComponent(Hello).vm.user_name).toBe('test_123');
    expect(wrapper.vm.$route.name).toBe('greetings');
    expect(wrapper.vm.$route.params).toEqual({ user_name: 'test_123' });

    await wrapper.vm.$router.push('/forbidden');
    expect(wrapper.find('#view').text()).toBe('Error 403');
    expect(wrapper.findComponent(Error).vm.code).toBe(403);
    expect(wrapper.vm.$route.name).toBeUndefined();
    expect(wrapper.vm.$route.params).toEqual({});

    await wrapper.vm.$router.push('/non-existent');
    expect(wrapper.find('#view').text()).toBe('Error 404');
    expect(wrapper.findComponent(Error).vm.code).toBe(404);
    expect(wrapper.vm.$route.path).toBe('*');
    expect(wrapper.vm.$route.params._).toBe('/non-existent');
});

test('meta object is stored properly', async () => {
    const wrapper = init();
    expect(wrapper.vm.$route.meta).toEqual({});

    await wrapper.vm.$router.push('/forbidden');
    expect(wrapper.vm.$route.meta).toEqual({ login_required: true });

    await wrapper.vm.$router.push('/about');
    expect(wrapper.vm.$route.meta).toEqual({});
});

test('exceptions are thrown with proper error messages', () => {
    const wrapper = init({ wildcard: false });
    expect(() => wrapper.vm.$router.push('/non-existent')).toThrow('no route matching the current path: /non-existent');
    expect(() => wrapper.vm.$router.resolve('forbidden')).toThrow('no route named "forbidden"');
    expect(() => wrapper.vm.$url('hello')).toThrow('no values provided for key `user_name`');  // From url-pattern
});

test('base parameter works', async () => {
    history.pushState({}, '', '/app/');

    const wrapper = init({ base: '/app' });
    expect(wrapper.find('#view').text()).toBe('Index page');

    await wrapper.find('a.about').trigger('click');
    expect(wrapper.find('#view').text()).toBe('About page');
    expect(location.pathname).toBe('/app/about');

    await wrapper.vm.$router.push('/app/hello/base');
    expect(wrapper.find('#view').text()).toBe('Hello, base!');
    expect(wrapper.vm.$route.name).toBe('hello');

    await wrapper.vm.$router.push('/app/app');
    expect(wrapper.find('#view').text()).toBe('Error 404');

    expect(wrapper.vm.$router.resolve('index')).toBe('/app/');
    expect(() => wrapper.vm.$router.push('/')).toThrow('no route matching the current path: /');
});
