import { Player } from "../../models/player";

export default (
  target: any,
  propertyKey: string | symbol,
  descriptor: TypedPropertyDescriptor<(...args: any[]) => any>
) => {
  const method = descriptor.value!;

  descriptor.value = function (...args: any[]) {
    const player = this as Player;

    if (player.isReady()) {
      return method.apply(player, args);
    }
  };

  return descriptor;
};
