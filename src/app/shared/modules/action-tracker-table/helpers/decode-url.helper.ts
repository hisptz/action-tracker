export function decodeUrl(rawUrlString) {
  const removeBracketsUrl = rawUrlString.replace(/["{}]+/g, '');
  const cleanUrlString = removeBracketsUrl.replace(/[-]+/g, ' ');

  const splitedGroups = (cleanUrlString.split(',') || []).map(
    (group, filters) => {
      const splitedGroup = group.split('.');
      const groupContent = (splitedGroup[0] || '').split(':');
      const groupMembers = (splitedGroup[1] || '').split(';');
      if (groupContent.length < 3) {
        return {
          [groupContent[0]]: {
            id: groupContent[0],
            name: groupContent[1],
            members: (groupMembers || []).map(memberContent => {
              const splitedMemberContent = memberContent.split(':');
              return {
                id: splitedMemberContent[0],
                name: splitedMemberContent[1]
              };
            })
          }
        };
      } else if ((groupContent.length = 3)) {
        return {
          [groupContent[1]]: groupContent[2]
        };
      }
    }
  );

  return splitedGroups;
}
