import { GroupPage, Groups, isGroup } from '@/types/metadata';

export default function findAllPageHrefs(navigation: Groups) {
  const publicPageHrefs = [] as string[];
  navigation.forEach((nav: GroupPage) => {
    if (isGroup(nav)) {
      publicPageHrefs.push(...recursivelyFindAllPageHrefs(nav.pages));
    } else if (nav.href) {
      publicPageHrefs.push(nav.href);
    }
  });
  return publicPageHrefs;
}

function recursivelyFindAllPageHrefs(groupPages: GroupPage[]) {
  const publicPageHrefs = [] as string[];
  groupPages.forEach((groupPage) => {
    if (isGroup(groupPage)) {
      publicPageHrefs.push(...recursivelyFindAllPageHrefs(groupPage.pages));
    } else if (groupPage.href) {
      publicPageHrefs.push(groupPage.href);
    }
  });
  return publicPageHrefs;
}
