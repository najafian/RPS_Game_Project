export default function UniqueID(prefix = 'CustomWidget-') {
  const lastId = Guid.newID();
  return `${prefix}${lastId}`;
}

export class Guid {
  static newID() {
    return 'xxxxxxxx'.replace(/[x]/g, function () {
      const random = Math.random() * 16 | 0;
      return random.toString(16);
    });
  }
}
