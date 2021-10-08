---
description: Existing test setup within the app
---

# Tests

### **End to end testing**

XState/test is used to auto-generate a set of tests based on path traversal through the state graph of the "ScreenFSM", see: 

{% page-ref page="../xstate-usage.md" %}

To achieve this one needs to define:

* A "test" state machine \(which can be the same machine as used in the actual application, or separate\) that additionally contains state assertions.
* Events with associated UI triggers.

See .... to understand to create meaningful tests automatically.



#### Running the tests

{% hint style="info" %}
Be sure to run a build before running the E2E test suite:
{% endhint %}

```text
$ yarn build
... 
$ yarn e2e
```

Settings are in **jest-puppeteer.config.js**





### Performance testing

For a quick overview of the applications initial load performance, check the PageSpeed analysis[: https://developers.google.com/speed/pagespeed/insights/?url=http%3A%2F%2Ftowerofhanoi.app%2F&tab=mobile](https://developers.google.com/speed/pagespeed/insights/?url=http%3A%2F%2Ftowerofhanoi.app%2F&tab=mobile)



