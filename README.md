# Benevenement

![Screenshot](./public/images/sc_rm3.png) 


**Projet 5 : Gestion des bénévoles - événement culturel, sportif…**

* un club de sport a des événements récurrents (matchs) et un pool de bénévoles avec des compétences plus ou moins bien identifiées
* les bénévoles ne sont dispos 7j/7 ni 24h/24 et leurs compétences / aspirations évoluent
* pour un événements, il faut bcp de ressources variées (s'occuper des maillots, réserver des salles, passer des commandes, gérer un stock, communiquer, configurer une billetterie, vendre des billets, tenir une buvette, accueillir les joueurs / arbitres, gérer des transports, placer des affichages, etc.)
* enjeux :
  * communiquer sur les événements auprès des bénévoles
  * affecter les bénévoles aux tâches
  * informer les bénévoles de leur affectations
* mais aussi :
* évaluer les bénévoles (un ordre de préférence selon les tâches par exemple)
* collecter des retours auprès des bénévoles (que faut-il améliorer...)

## TODOLIST

- *
- *
- *

## NEWS

**15/09**

**Principe de mise à jour des données dans le formulaire UserProfile :**

1. Le formulaire est initialisé vide (useForm sans defaultValues).
2. Au useEffect (montage), on appelle assignUserStorage() → Zustand est rempli avec user + address.
3. Un deuxième useEffect écoute userAddress et appelle reset(userAddress) → le form. est rempli avec les data issues du localStorage.

Le localStorage est rempli via la méthode AssignUserStorage() :

=> AXIOS => Nest => BDD => retour des DATA avec Address imbriquée dans User.


