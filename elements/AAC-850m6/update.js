function(instance, properties, context) {
    const diffResult = instance.data.createDiff(properties.previous_text, properties.current_text);
    instance.publishState('diff', diffResult);
    instance.canvas.html(diffResult);
}