
export function randomThoughts() {

    const arrayOfThoughts = [

        '"The greatest pleasure in life is giving. The true wealth is in the ability to be grateful for what you can give." - J. F. Kennedy',
        '"The best way to find yourself is to lose yourself in the service of others." - Mahatma Gandhi',
        '"No one has ever become poor by giving." - Anne Frank',
        '"We make a living by what we get, but we make a life by what we give." - Winston Churchill',
        '"The meaning of life is to find your gift. The purpose of life is to give it away." - Pablo Picasso',
        '"We can\'t help everyone, but everyone can help someone." - Ronald Reagan',
        '"It\'s not how much we give but how much love we put into giving." - Mother Teresa',
        '"The measure of life is not its duration, but its donation." - Peter Marshall',
        '"The value of a man resides in what he gives and not in what he is capable of receiving." - Albert Einstein',
        '"The only ones among you who will be really happy are those who will have sought and found how to serve." - Albert Schweitzer'
    ]

    const randomIndex = Math.floor(Math.random() * arrayOfThoughts.length);

    return arrayOfThoughts[randomIndex];
}