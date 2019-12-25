export interface PlayerService {
    setPlayerName?(label?: string): void;

    setPlayerClassIcon?(className: string): void;

    setPlayerResult?(result: number): void;
}