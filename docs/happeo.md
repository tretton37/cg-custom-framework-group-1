# Rolling our own frontend JS framework

Building a web frontend with a modern JavaScript framework can feel pretty much like magic. A quick set up, and then with just a few lines of code, you already have a simple interactive app running in the browser. The frameworks enable us to focus on user experience and business value, by taking care of the low-level heavy lifting. Continue coding and not before long, you have built a blazingly fast, great looking, well-factored application (your mileage may vary). 

But have you ever thought about how such a framework - for example React or Angular - actually works? In this CG, we set out to explore the inner workings of a frontend framework, not by studying one, but by designing our own from the ground up. And it turned out that, yes - building a simple framework is quite possible, and with a limited scope, it can be done in a fairly short time.

## A tall order

The task was quite straightforward, if also daunting at first: Write a framework, and then build a todo-app using that framework.

There were a few basic functionalities that the framework should support:
- State handling and reactivity
- Custom components
- JSX handling

The framework and the app were to be implemented during four mob programming sessions, in a total of around 10 hours.

Exactly how to design the framework was up to us. The first thing we did, of course, was too decide on a name. Simple enough, we took the first letter of each of our names, ending up with HISAFE. We were getting off to a great start!

## The mob sessions

A couple of the group members had experience of mob/pair programming, but it was new to most of us. At the beginning, the process was mainly propelled by a couple of members that took the lead, but as we tried to honor the guiding principles of mob programming (change driver every 10 minutes regardless of progress, the driver does what the mob says), more people got involved. Before we knew it, many of us were almost struggling to get our voices heard in the cacaphony of ideas and suggestions.

The group was a mix of more backend- vs. more frontend oriented talents, and it felt like the mixed experiences from both worlds came into play as our new, groundbreaking JS framework took form. It was great to see that everyone in the group could and would contribute with their knowledge in the process, and we ended up with something that worked surprisingly well considering the fairly small amount of actual code. It taught us that a JS framework is not necessary at all the sorcery it may seem to be, but can instead be a few dozens line of code.

The most difficult bit seemed to be to get started. Once the project plumbing was in place and there was an idea of how to proceed, the mob programming was fast, fun, and efficient. The initial decision making process and setting up of config files etc. didn't feel like the optimal task for a mob to take on. With that said, it is possible that the project would have taken an entirely different direction if the initial part would have been carried out in a different way.

## How it turned out

Technology-wise, here are some of the things we ended up with:
- TypeScript, for type safety and JSX parsing
- [Web Components](https://developer.mozilla.org/en-US/docs/Web/Web_Components), to enable components the native way, and using a common base class to reduce the amount of code in each component
- [CustomEvents](https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/CustomEvent) for sending events to parent components
- [Proxy](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy) for re-rendering on state changes

We were quite pleased with the framework, and the app turned out looking even better than expected!

<img src="static/images/final.apng">

## There be Dragons
So you might be wondering now if this is something you can just download and use. And - yes, but actually no! If you are curious, you can use the [Quick Start in the README.md](https://github.com/tretton37/cg-custom-framework-group-1#readme) to set up a basic app on your machine and give it a spin. However, while that should work, the framework is probably too limited, and too quirky, to be a realistic alternative to a proper framework.

## Conclusion
When our journey towards the perfect framework started out, it seemed we had an impossible mountain to climb. But in just a few sessions, we were able to demystify much of what makes a framework tick, and also learned a few new tricks.

Before the project, many of us had only limited experience in mob programming but we soon felt relatively comfortable working together in this fashion. We were often able to come up with ideas and arrive at good solutions fairly quickly.

Maybe the real framework is the friends we made along the way?