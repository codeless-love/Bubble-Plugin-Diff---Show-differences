function(instance, context) {
    instance.data.createDiff = function(oldStr, newStr) {
      const oldWords = oldStr.split(/\s+/);
      const newWords = newStr.split(/\s+/);
      let i = 0, j = 0;
      let result = [];

      while (i < oldWords.length || j < newWords.length) {
        if (i < oldWords.length && j < newWords.length && oldWords[i] === newWords[j]) {
          // Words match
          result.push(oldWords[i]);
          i++;
          j++;
        } else {
          // Difference found
          let tempOld = i;
          // Look ahead to see if the word reappears (basic heuristic)
          while (tempOld < oldWords.length && !newWords.slice(j).includes(oldWords[tempOld])) {
            result.push(`<del style="background:#ffeef0; text-decoration:line-through; color:#b31d28;">${oldWords[tempOld]}</del>`);
            tempOld++;
          }
          i = tempOld;

          let tempNew = j;
          while (tempNew < newWords.length && !oldWords.slice(i).includes(newWords[tempNew])) {
            result.push(`<ins style="background:#e6ffed; text-decoration:none; color:#22863a;">${newWords[tempNew]}</ins>`);
            tempNew++;
          }
          j = tempNew;
        }
      }

      return result.join(' ');
    }
}