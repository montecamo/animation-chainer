function chainAnimations(animations, element, options = {}) {
  let mapper = createMapper(animations);

  playAnimation(animations[0], element); 

  element.addEventListener('animationend', (e) => {
    let nextAnimation = mapper[e.animationName];

    playAnimation(nextAnimation, element);
  }, options.useCapture || false);
}

function playAnimation(animation, element) {
  element.style.animationName = animation.name;
  element.style.animationDuration = (animation.duration || 0) + 's';
  element.style.animationDelay = (animation.delay || 0) + 's';
}

function createMapper(animations) {
  let mapper = {};

  for (let i = 0, len = animations.length; i < len; i++) {
    let currentAnimation = animations[i];
    let nextAnimation = animations[(i + 1) % len];

    mapper[currentAnimation.name] = {
      name: nextAnimation.name,
      delay: nextAnimation.delay,
      duration: nextAnimation.duration, 
    };
  }

  return mapper;
}
